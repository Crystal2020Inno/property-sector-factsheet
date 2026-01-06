# Newsletter & Factsheet Widgets

Separate embeddable widgets for displaying newsletters and factsheets from your API. Each widget can be independently embedded on any website using jsDelivr CDN.

## Files

### Newsletter Widget

- `newsletter-widget.js` - Newsletter widget JavaScript file
- `newsletter-widget.css` - Newsletter widget stylesheet

### Factsheet Widget

- `factsheet-widget.js` - Factsheet widget JavaScript file
- `factsheet-widget.css` - Factsheet widget stylesheet

### Legacy/Combined Widget (Optional)

- `widget.js` - Combined widget JavaScript file (displays both)
- `widget.css` - Combined widget stylesheet
- `index.html` - Demo/example file for local testing

## Setup

1. Push this repository to GitHub
2. Create a release or use the main branch
3. Users can embed either widget independently using jsDelivr

## Embedding Instructions

### Newsletter Widget

Add the following code to your HTML page where you want the newsletter widget to appear:

```html
<!-- 1. Create a container div -->
<div id="newsletter-widget"></div>

<!-- 2. Load the newsletter widget JavaScript from jsDelivr -->
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@main/newsletter-widget.js"></script>

<!-- 3. Initialize the newsletter widget -->
<script>
  NewsletterWidget.init({
    targetId: "newsletter-widget",
    apiKey: "your-api-key-here",
    apiBaseUrl: "https://content-api-2020-5886a3310333.herokuapp.com/api",
  });
</script>
```

### Factsheet Widget

Add the following code to your HTML page where you want the factsheet widget to appear:

```html
<!-- 1. Create a container div -->
<div id="factsheet-widget"></div>

<!-- 2. Load the factsheet widget JavaScript from jsDelivr -->
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@main/factsheet-widget.js"></script>

<!-- 3. Initialize the factsheet widget -->
<script>
  FactsheetWidget.init({
    targetId: "factsheet-widget",
    apiKey: "your-api-key-here",
    apiBaseUrl: "https://content-api-2020-5886a3310333.herokuapp.com/api",
  });
</script>
```

### Embedding Both Widgets

You can embed both widgets on the same page independently:

```html
<!-- Newsletter Widget -->
<div id="newsletter-widget"></div>
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@main/newsletter-widget.js"></script>
<script>
  NewsletterWidget.init({
    targetId: "newsletter-widget",
    apiKey: "your-api-key-here",
    apiBaseUrl: "https://content-api-2020-5886a3310333.herokuapp.com/api",
    title: "Latest Newsletters",
    showTitle: true,
  });
</script>

<!-- Factsheet Widget -->
<div id="factsheet-widget"></div>
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@main/factsheet-widget.js"></script>
<script>
  FactsheetWidget.init({
    targetId: "factsheet-widget",
    apiKey: "your-api-key-here",
    apiBaseUrl: "https://content-api-2020-5886a3310333.herokuapp.com/api",
    title: "Factsheets",
    showTitle: true,
  });
</script>
```

## Configuration Options

### NewsletterWidget.init() Options

- `targetId` (string, required) - The ID of the HTML element where the widget will be rendered
- `apiKey` (string, required) - Your API key for authentication
- `apiBaseUrl` (string, optional) - Base URL for the API (defaults to the provided URL)
- `title` (string, optional) - Title to display at the top of the widget (default: "Newsletters")
- `showTitle` (boolean, optional) - Whether to show the title (default: true)

### FactsheetWidget.init() Options

- `targetId` (string, required) - The ID of the HTML element where the widget will be rendered
- `apiKey` (string, required) - Your API key for authentication
- `apiBaseUrl` (string, optional) - Base URL for the API (defaults to the provided URL)
- `title` (string, optional) - Title to display at the top of the widget (default: "Factsheets")
- `showTitle` (boolean, optional) - Whether to show the title (default: true)

## Examples

### Newsletter Widget with Custom Title

```html
<div id="my-newsletter-widget"></div>
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@main/newsletter-widget.js"></script>
<script>
  NewsletterWidget.init({
    targetId: "my-newsletter-widget",
    apiKey: "your-api-key-here",
    title: "Latest Updates",
    showTitle: true,
  });
</script>
```

### Factsheet Widget Without Title

```html
<div id="factsheet-widget"></div>
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@main/factsheet-widget.js"></script>
<script>
  FactsheetWidget.init({
    targetId: "factsheet-widget",
    apiKey: "your-api-key-here",
    showTitle: false,
  });
</script>
```

## jsDelivr URL Format

Replace the following in the script src:

- `YOUR_USERNAME` - Your GitHub username
- `YOUR_REPO` - Your repository name
- `main` - The branch name (or use a tag/version like `v1.0.0`)

Examples:

- `https://cdn.jsdelivr.net/gh/username/repo@main/newsletter-widget.js`
- `https://cdn.jsdelivr.net/gh/username/repo@main/factsheet-widget.js`
- `https://cdn.jsdelivr.net/gh/username/repo@v1.0.0/newsletter-widget.js`
- `https://cdn.jsdelivr.net/gh/username/repo@latest/factsheet-widget.js`

## Local Testing

To test locally, you can create HTML files that reference the widget files:

**test-newsletter.html:**

```html
<div id="newsletter-widget"></div>
<script src="newsletter-widget.js"></script>
<script>
  NewsletterWidget.init({
    targetId: "newsletter-widget",
    apiKey: "your-api-key",
    apiBaseUrl: "https://content-api-2020-5886a3310333.herokuapp.com/api",
  });
</script>
```

**test-factsheet.html:**

```html
<div id="factsheet-widget"></div>
<script src="factsheet-widget.js"></script>
<script>
  FactsheetWidget.init({
    targetId: "factsheet-widget",
    apiKey: "your-api-key",
    apiBaseUrl: "https://content-api-2020-5886a3310333.herokuapp.com/api",
  });
</script>
```

## Features

- ✅ **Independent widgets** - Newsletter and Factsheet widgets work separately
- ✅ **Responsive design** - Works on all screen sizes
- ✅ **Automatic CSS loading** - CSS loads automatically from the same CDN location
- ✅ **Error handling** - Graceful error messages for API failures
- ✅ **Loading states** - Shows loading indicators while fetching data
- ✅ **XSS protection** - All user content is HTML-escaped
- ✅ **Easy to embed** - Simple script tag integration
- ✅ **No dependencies** - Pure vanilla JavaScript
- ✅ **Works with jsDelivr CDN** - Fast global CDN delivery

## Browser Support

Works in all modern browsers that support:

- ES5 JavaScript
- Fetch API
- CSS Flexbox

## Security Note

⚠️ **Important**: The API key is exposed in the client-side code. Make sure your API has proper CORS settings and rate limiting. Consider using a public/read-only API key for these widgets.
