# Factsheet Widgets

Embeddable widgets for displaying factsheets from your API. The widgets can be embedded on any website using jsDelivr CDN.

## Files

### Factsheet Widget

- `factsheet-widget.js` - Factsheet widget JavaScript file
- `factsheet-widget.css` - Factsheet widget stylesheet

### Factsheet List Widget

- `factsheet-list-widget.js` - Factsheet list widget JavaScript file
- `factsheet-list-widget.css` - Factsheet list widget stylesheet

### Factsheet Detail Widget

- `factsheet-detail-widget.js` - Factsheet detail widget JavaScript file
- `factsheet-detail-widget.css` - Factsheet detail widget stylesheet

## Setup

1. Push this repository to GitHub
2. Create a release or use the main branch
3. Users can embed the widgets using jsDelivr

## Embedding Instructions

### List + Detail Widget Pattern (Recommended)

This pattern shows a summary list with "Read more" buttons that link to detail pages. Perfect for better user experience and page performance.

#### Step 1: Create a List Page

Embed the list widget on your listing page:

```html
<!-- Factsheet List Page -->
<div id="factsheet-list-widget"></div>
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@main/factsheet-list-widget.js"></script>
<script>
  FactsheetListWidget.init({
    targetId: "factsheet-list-widget",
    apiKey: "your-api-key-here",
    apiBaseUrl: "https://content-api-2020-5886a3310333.herokuapp.com/api",
    detailPageUrl: "factsheet-detail.html", // URL to your detail page
    title: "Factsheets",
    showTitle: true,
  });
</script>
```

#### Step 2: Create a Detail Page

Embed the detail widget on your detail page. The ID is automatically read from the URL parameter:

```html
<!-- Factsheet Detail Page (factsheet-detail.html) -->
<div id="factsheet-detail-widget"></div>
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@main/factsheet-detail-widget.js"></script>
<script>
  FactsheetDetailWidget.init({
    targetId: "factsheet-detail-widget",
    apiKey: "your-api-key-here",
    apiBaseUrl: "https://content-api-2020-5886a3310333.herokuapp.com/api",
    // factsheetId is automatically read from URL ?id= parameter
  });
</script>
```

When users click "Read more", they'll be taken to `factsheet-detail.html?id=123` and the detail widget will automatically load that factsheet.

### Full Content Widget

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

## Configuration Options

### FactsheetListWidget.init() Options

- `targetId` (string, required) - The ID of the HTML element where the widget will be rendered
- `apiKey` (string, required) - Your API key for authentication
- `apiBaseUrl` (string, optional) - Base URL for the API (defaults to the provided URL)
- `title` (string, optional) - Title to display at the top of the widget (default: "Factsheets")
- `showTitle` (boolean, optional) - Whether to show the title (default: true)
- `detailPageUrl` (string, required) - URL to the detail page where users will be redirected when clicking "Read more"

### FactsheetDetailWidget.init() Options

- `targetId` (string, required) - The ID of the HTML element where the widget will be rendered
- `apiKey` (string, required) - Your API key for authentication
- `apiBaseUrl` (string, optional) - Base URL for the API (defaults to the provided URL)
- `factsheetId` (string, optional) - The ID of the factsheet to display. If not provided, it will be read from the URL parameter `?id=...`

### FactsheetWidget.init() Options

- `targetId` (string, required) - The ID of the HTML element where the widget will be rendered
- `apiKey` (string, required) - Your API key for authentication
- `apiBaseUrl` (string, optional) - Base URL for the API (defaults to the provided URL)
- `title` (string, optional) - Title to display at the top of the widget (default: "Factsheets")
- `showTitle` (boolean, optional) - Whether to show the title (default: true)

## Examples

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

### Factsheet Widget with Custom Title

```html
<div id="my-factsheet-widget"></div>
<script src="https://cdn.jsdelivr.net/gh/YOUR_USERNAME/YOUR_REPO@main/factsheet-widget.js"></script>
<script>
  FactsheetWidget.init({
    targetId: "my-factsheet-widget",
    apiKey: "your-api-key-here",
    title: "Property Factsheets",
    showTitle: true,
  });
</script>
```

## jsDelivr URL Format

Replace the following in the script src:

- `YOUR_USERNAME` - Your GitHub username
- `YOUR_REPO` - Your repository name
- `main` - The branch name (or use a tag/version like `v1.0.0`)

Examples:

- `https://cdn.jsdelivr.net/gh/username/repo@main/factsheet-widget.js`
- `https://cdn.jsdelivr.net/gh/username/repo@main/factsheet-list-widget.js`
- `https://cdn.jsdelivr.net/gh/username/repo@main/factsheet-detail-widget.js`
- `https://cdn.jsdelivr.net/gh/username/repo@v1.0.0/factsheet-widget.js`
- `https://cdn.jsdelivr.net/gh/username/repo@latest/factsheet-widget.js`

## Features

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
