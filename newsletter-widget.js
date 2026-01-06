/**
 * Newsletter Widget
 * Embeddable widget for displaying newsletters
 *
 * Usage:
 * <div id="newsletter-widget"></div>
 * <script src="https://cdn.jsdelivr.net/gh/username/repo@main/newsletter-widget.js"></script>
 * <script>
 *   NewsletterWidget.init({
 *     targetId: 'newsletter-widget',
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
    targetId: "newsletter-widget",
    title: "Newsletters",
    showTitle: true,
  };

  // Load CSS if not already loaded
  function loadCSS() {
    if (document.getElementById("newsletter-widget-css")) {
      return;
    }

    const link = document.createElement("link");
    link.id = "newsletter-widget-css";
    link.rel = "stylesheet";
    link.type = "text/css";

    // Try to load from jsDelivr, fallback to relative path
    const scriptTag = document.querySelector('script[src*="newsletter-widget.js"]');
    if (scriptTag && scriptTag.src) {
      const baseUrl = scriptTag.src.replace("newsletter-widget.js", "");
      link.href = baseUrl + "newsletter-widget.css";
    } else {
      link.href = "newsletter-widget.css";
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

  // Render newsletters
  function renderNewsletters(newsletters, container) {
    if (!newsletters || newsletters.length === 0) {
      container.innerHTML = '<p class="empty">No newsletters found</p>';
      return;
    }

    let html = "";
    newsletters.forEach((newsletter) => {
      const title = newsletter.title || "No title";
      const intro = newsletter.intro || "No introduction";
      const sections = newsletter.sections || [];
      const link = newsletter.link || "";
      const createdAt = newsletter.createdAt
        ? new Date(newsletter.createdAt).toLocaleDateString()
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
  const NewsletterWidget = {
    config: {},
    targetElement: null,

    init: function (options) {
      // Merge options with defaults
      this.config = Object.assign({}, defaults, options);

      if (!this.config.apiKey) {
        console.error("NewsletterWidget: API key is required");
        return;
      }

      // Find target element
      this.targetElement = document.getElementById(this.config.targetId);
      if (!this.targetElement) {
        console.error(
          `NewsletterWidget: Target element with id "${this.config.targetId}" not found`
        );
        return;
      }

      // Load CSS
      loadCSS();

      // Add widget class to target element
      this.targetElement.classList.add("newsletter-widget");

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
          <div id="newsletters-result" class="loading">
            Loading newsletters...
          </div>
        </div>
      `;
    },

    fetchData: function () {
      const newslettersResult = document.getElementById("newsletters-result");

      // Fetch newsletters
      fetch(`${this.config.apiBaseUrl}/newsletters`, {
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
          console.log("Newsletters API Response:", data);

          if (!data || !data.data || !data.data.newsletters) {
            newslettersResult.innerHTML = `
              <div class="error">Error: Unexpected response structure</div>
              <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
            return;
          }

          const newsletters = data.data.newsletters;
          renderNewsletters(newsletters, newslettersResult);
        })
        .catch((error) => {
          console.error("Error fetching newsletters:", error);
          newslettersResult.innerHTML = `<div class="error">Error: ${error.message}</div>`;
        });
    },
  };

  // Expose to global scope
  window.NewsletterWidget = NewsletterWidget;
})(window);

