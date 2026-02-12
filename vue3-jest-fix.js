/**
 * Custom Jest transform wrapper around @vue/vue3-jest.
 *
 * Fixes a variable-name collision in the compiled SFC output:
 *   - <script>  compiles to  var _vue = require("@ionic/vue")
 *   - <template> compiles to  var _vue = require("vue")
 *   Both land in the same module scope. The template's assignment overwrites
 *   the script's, so any @ionic/vue export used at call-time (e.g.
 *   loadingController inside a method) becomes undefined.
 *
 * Fix: after @vue/vue3-jest compiles the SFC, split at the render-function
 * boundary (second "use strict") and rename _vue → _vue2 in the render
 * section only. This eliminates the collision without touching component code.
 */
const vue3Jest = require('@vue/vue3-jest');

module.exports = {
  process(src, filename, options) {
    const result = vue3Jest.process(src, filename, options);
    let code = typeof result === 'string' ? result : result.code;

    // Only apply to .vue files
    if (!filename.endsWith('.vue')) return result;

    // The compiled output has two sections, each starting with "use strict";
    // Section 1 (script):  var _vue = require("@ionic/vue")
    // Section 2 (render):  var _vue = require("vue")
    const marker = '"use strict";';
    const firstIdx = code.indexOf(marker);
    if (firstIdx === -1) return result;

    const secondIdx = code.indexOf(marker, firstIdx + marker.length);
    if (secondIdx === -1) return result; // no render section — nothing to fix

    // Rename _vue → _vue2 only in the render section
    const scriptSection = code.slice(0, secondIdx);
    const renderSection = code.slice(secondIdx).replace(/\b_vue\b/g, '_vue2');
    code = scriptSection + renderSection;

    if (typeof result === 'string') return code;
    return { ...result, code };
  },
};
