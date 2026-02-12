@.cursor-blueprint.md

Create services in `src/services` using Capacitor plugins (no Preferences):

1. **CameraService.js** – wrap `Camera.getPhoto()` (e.g. takePhoto() that returns photo path or base64). Unit test: mock the Camera plugin and verify getPhoto is called and the returned photo is passed through.

2. **GeolocationService.js** – use @capacitor/geolocation: wrap `Geolocation.getCurrentPosition()` (e.g. getLocation() that returns `{ latitude, longitude }`). Unit test: mock the Geolocation plugin and verify getCurrentPosition is called and coords are returned.

3. **FilesystemService.js** – use @capacitor/filesystem: wrap `Filesystem.readFile` and `Filesystem.writeFile` (e.g. readFile(path, directory), writeFile(path, data, directory)). Unit test: mock the Filesystem plugin to verify readFile/writeFile operations.

Remove any existing Preferences-based storage service from Phase 3. Each service has its own spec file in `tests/unit/services/` that mocks the corresponding Capacitor plugin. Follow the test-generation command for test structure (factory, required cases, comment descriptions).
