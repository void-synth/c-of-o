# Assets Folder

This folder is ready for your background image upload.

## Expected File
- `background.jpg` or `background.png` - The background image for the website

## Usage
Once you upload the background image, you can update the CSS in `styles.css` to use it by modifying the body background property:

```css
body {
    background: url('./assets/background.jpg') center/cover no-repeat,
                linear-gradient(180deg, #fafafa 0%, #e0e7ff 30%, #c7d2fe 70%, #a5b4fc 100%);
}
```

The current implementation uses CSS gradients that match the original design, but you can replace or overlay with your custom background image.
