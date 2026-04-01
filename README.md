# Weekend in Stockholm

A simple React app for finding Stockholm events and saving them to a personal weekend guide.

## What the app does

- Home shows the app and some Stockholm event inspiration
- Explore loads Stockholm events from an API
- Manage lets the user save, edit, delete, search, filter, sort, and favorite events

## Main features

- Add events to your weekend guide
- View saved events
- Edit saved events
- Delete saved events
- Search and filter events
- Sort events
- Favorite events
- Live weather in Stockholm

## Run the project

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Deployment

- The app uses `HashRouter`
- Vite is set with `base: "./"`
- Build files are created in `dist/`

This makes it easier to deploy on GitHub Pages or other static hosting.
