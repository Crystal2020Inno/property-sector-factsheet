/**
 * Factsheet Widget
 * Embeddable widget for displaying factsheets
 *
 * Usage:
 * <div id="factsheet-widget"></div>
 * <script src="https://cdn.jsdelivr.net/gh/username/repo@main/factsheet-widget.js"></script>
 * <script>
 *   FactsheetWidget.init({
 *     targetId: 'factsheet-widget',
 *     apiKey: 'your-api-key',
 *     apiBaseUrl: 'https://content-api-2020-5886a3310333.herokuapp.com/api'
 *   });
 * </script>
 */

(function (window) {
  "use strict";

  // Default configuration
  const defaults = {
    apiBaseUrl: "https://content-api-2020-5886a3310333.herokuapp.com/api",
    apiKey: "",
    targetId: "factsheet-widget",
    title: "Factsheets",
    showTitle: true,
  };

  // Load CSS if not already loaded
  function loadCSS() {
    if (document.getElementById("factsheet-widget-css")) {
      return;
    }

    const link = document.createElement("link");
    link.id = "factsheet-widget-css";
    link.rel = "stylesheet";
    link.type = "text/css";

    // Try to load from jsDelivr, fallback to relative path
    const scriptTag = document.querySelector('script[src*="factsheet-widget.js"]');
    if (scriptTag && scriptTag.src) {
      const baseUrl = scriptTag.src.replace("factsheet-widget.js", "");
      link.href = baseUrl + "factsheet-widget.css";
    } else {
      link.href = "factsheet-widget.css";
    }

    document.head.appendChild(link);
  }

  // Format sections for display
  function formatSections(sections) {
    if (!sections || !Array.isArray(sections) || sections.length === 0) {
      return "<p class='empty'>No sections available</p>";
    }

    let sectionsHTML = "";
    sections.forEach((section) => {
      sectionsHTML += `
        <div class="section">
          <h4>${escapeHtml(section.title || "Untitled Section")}</h4>
          ${
            section.content && Array.isArray(section.content)
              ? section.content
                  .map(
                    (content) =>
                      `<div class="section-content">${sanitizeHtml(
                        content
                      )}</div>`
                  )
                  .join("")
              : ""
          }
        </div>
      `;
    });
    return sectionsHTML;
  }

  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    if (typeof text !== "string") return text;
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  // Sanitize HTML - allows safe HTML tags but removes dangerous ones
  function sanitizeHtml(html) {
    if (typeof html !== "string") return html;
    
    // Create a temporary div to parse the HTML
    const temp = document.createElement("div");
    temp.innerHTML = html;
    
    // Remove dangerous elements and attributes
    const dangerousTags = ["script", "iframe", "object", "embed", "form", "input", "button"];
    dangerousTags.forEach((tag) => {
      const elements = temp.querySelectorAll(tag);
      elements.forEach((el) => el.remove());
    });
    
    // Remove dangerous attributes from all elements
    const allElements = temp.querySelectorAll("*");
    allElements.forEach((el) => {
      // Remove event handlers and javascript: URLs
      Array.from(el.attributes).forEach((attr) => {
        if (
          attr.name.startsWith("on") ||
          (attr.name === "href" && attr.value.toLowerCase().startsWith("javascript:")) ||
          (attr.name === "src" && attr.value.toLowerCase().startsWith("javascript:"))
        ) {
          el.removeAttribute(attr.name);
        }
      });
    });
    
    return temp.innerHTML;
  }

  // Render factsheets
  function renderFactsheets(factsheets, container) {
    if (!factsheets || factsheets.length === 0) {
      container.innerHTML = '<p class="empty">No factsheets found</p>';
      return;
    }

    let html = "";
    factsheets.forEach((factsheet) => {
      const title = factsheet.title || "No title";
      const intro = factsheet.intro || "No introduction";
      const sections = factsheet.sections || [];
      const link = factsheet.link || "";
      const createdAt = factsheet.createdAt
        ? new Date(factsheet.createdAt).toLocaleDateString()
        : "";

      html += `
        <div class="item">
          <h3>${escapeHtml(title)}</h3>
          ${createdAt ? `<p><small>Created: ${createdAt}</small></p>` : ""}
          <div class="intro">${sanitizeHtml(intro)}</div>
          ${formatSections(sections)}
          ${
            link
              ? `<p><a href="${escapeHtml(
                  link
                )}" target="_blank" rel="noopener noreferrer">View Link: ${escapeHtml(
                  link
                )}</a></p>`
              : ""
          }
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // Main widget class
  const FactsheetWidget = {
    config: {},
    targetElement: null,

    init: function (options) {
      // Merge options with defaults
      this.config = Object.assign({}, defaults, options);

      if (!this.config.apiKey) {
        console.error("FactsheetWidget: API key is required");
        return;
      }

      // Find target element
      this.targetElement = document.getElementById(this.config.targetId);
      if (!this.targetElement) {
        console.error(
          `FactsheetWidget: Target element with id "${this.config.targetId}" not found`
        );
        return;
      }

      // Load CSS
      loadCSS();

      // Add widget class to target element
      this.targetElement.classList.add("factsheet-widget");

      // Render initial HTML structure
      this.render();

      // Fetch and display data
      this.fetchData();
    },

    render: function () {
      const titleHTML = this.config.showTitle
        ? `<h1>${escapeHtml(this.config.title)}</h1>`
        : "";

      this.targetElement.innerHTML = `
        ${titleHTML}
        <div class="container">
          <div id="factsheets-result" class="loading">
            Loading factsheets...
          </div>
        </div>
      `;
    },

    fetchData: function () {
      const factsheetsResult = document.getElementById("factsheets-result");

      // Fetch factsheets
      fetch(`${this.config.apiBaseUrl}/factsheets`, {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(
                errorData.message || `HTTP error! status: ${response.status}`
              );
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Factsheets API Response:", data);

          if (!data || !data.data || !data.data.factsheets) {
            factsheetsResult.innerHTML = `
              <div class="error">Error: Unexpected response structure</div>
              <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
            return;
          }

          const factsheets = data.data.factsheets;
          renderFactsheets(factsheets, factsheetsResult);
        })
        .catch((error) => {
          console.error("Error fetching factsheets:", error);
          factsheetsResult.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        });
    },
  };

  // Expose to global scope
  window.FactsheetWidget = FactsheetWidget;
})(window);

