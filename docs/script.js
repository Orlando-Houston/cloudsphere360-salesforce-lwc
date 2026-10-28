
"use strict";

// CloudSphere 360 — Public Interactive Learning Demo
// Standalone web implementation of the Salesforce LWC concept.

const topics = [
    {
        id: "architecture",
        icon: "☁",
        title: "Cloud Architecture",
        subtitle: "SaaS, PaaS and IaaS",
        description:
            "Cloud computing delivers computing resources and services " +
            "over the internet. SaaS provides ready-to-use software, " +
            "PaaS provides a development platform, and IaaS provides " +
            "infrastructure resources.",
        example:
            "Salesforce CRM is a SaaS solution. The Salesforce Platform " +
            "provides PaaS capabilities for developing applications " +
            "with Apex and Lightning Web Components.",
        takeaway:
            "Understand the differences between SaaS, PaaS and IaaS."
    },
    {
        id: "security",
        icon: "🔒",
        title: "Cloud Security",
        subtitle: "Access and Data Protection",
        description:
            "Cloud security protects applications, identities and data " +
            "using authentication, authorization, encryption " +
            "and monitoring.",
        example:
            "Salesforce uses profiles, permission sets, " +
            "organization-wide defaults, sharing rules and " +
            "field-level security to control access.",
        takeaway:
            "Understand layered security and least-privilege access."
    },
    {
        id: "data",
        icon: "▤",
        title: "Data Cloud",
        subtitle: "Data Integration and Unification",
        description:
            "Cloud data platforms ingest, harmonize and unify " +
            "information from multiple sources to support analytics " +
            "and business decisions.",
        example:
            "Salesforce Data 360, formerly Data Cloud, provides " +
            "capabilities for integrating, harmonizing and " +
            "activating customer data.",
        takeaway:
            "Learn how unified data supports business decisions."
    },
    {
        id: "integration",
        icon: "⚡",
        title: "Cloud Integration",
        subtitle: "APIs and Connectivity",
        description:
            "Cloud integration connects applications and systems " +
            "so they can exchange data securely using APIs " +
            "and integration patterns.",
        example:
            "Apex HTTP callouts can connect Salesforce with external " +
            "REST APIs. Named Credentials help manage endpoints " +
            "and authentication.",
        takeaway:
            "Understand how APIs connect Salesforce to external services."
    },
    {
        id: "monitoring",
        icon: "◉",
        title: "Cloud Monitoring",
        subtitle: "Logs and Performance",
        description:
            "Cloud monitoring helps developers investigate failures, " +
            "observe application behavior and improve reliability.",
        example:
            "Salesforce Debug Logs help troubleshoot Apex execution. " +
            "Event Monitoring provides additional visibility " +
            "where licensed and available.",
        takeaway:
            "Learn why observability and troubleshooting matter."
    },
    {
        id: "deployment",
        icon: "↑",
        title: "Cloud Deployment",
        subtitle: "DevOps and CI/CD",
        description:
            "Deployment moves application changes across development, " +
            "testing and production environments. Version control " +
            "and automated validation help reduce release risks.",
        example:
            "Salesforce CLI and GitHub support source-driven " +
            "development, automated tests and metadata deployment " +
            "across Salesforce orgs.",
        takeaway:
            "Understand version control, testing and deployment workflows."
    }
];

const topicGrid = document.getElementById("topicGrid");
const detailPanel = document.getElementById("detailPanel");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");
const progressTrack = document.getElementById("progressTrack");
const resetButton = document.getElementById("resetBtn");
const completionMessage = document.getElementById("completionMessage");

const visitedTopics = new Set();
let selectedTopicId = null;

function createTopicCard(topic) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "topic-card";
    button.dataset.id = topic.id;

    const icon = document.createElement("span");
    icon.className = "topic-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = topic.icon;

    const title = document.createElement("span");
    title.className = "topic-title";
    title.textContent = topic.title;

    const subtitle = document.createElement("span");
    subtitle.className = "topic-subtitle";
    subtitle.textContent = topic.subtitle;

    const status = document.createElement("span");
    status.className = "topic-status";
    status.textContent = "Explore topic →";

    button.append(icon, title, subtitle, status);

    button.addEventListener("click", () => {
        selectTopic(topic.id);
    });

    return button;
}

function renderCards() {
    topicGrid.replaceChildren();

    topics.forEach((topic) => {
        const card = createTopicCard(topic);

        const isVisited = visitedTopics.has(topic.id);
        const isSelected = selectedTopicId === topic.id;

        card.classList.toggle("visited", isVisited);
        card.classList.toggle("selected", isSelected);
        card.setAttribute("aria-pressed", String(isSelected));

        const status = card.querySelector(".topic-status");
        status.textContent = isVisited
            ? "✓ Explored"
            : "Explore topic →";

        topicGrid.appendChild(card);
    });
}

function addParagraph(parent, text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    parent.appendChild(paragraph);
}

function addHeading(parent, text, level = 4) {
    const heading = document.createElement(`h${level}`);
    heading.textContent = text;
    parent.appendChild(heading);
}

function renderDetails(topic) {
    detailPanel.replaceChildren();

    if (!topic) {
        const empty = document.createElement("div");
        empty.className = "empty-state";

        const symbol = document.createElement("span");
        symbol.className = "empty-icon";
        symbol.textContent = "✦";

        empty.appendChild(symbol);
        addHeading(empty, "Your cloud journey starts here", 3);
        addParagraph(
            empty,
            "Choose any topic above to explore how cloud computing " +
            "connects to Salesforce."
        );

        detailPanel.appendChild(empty);
        return;
    }

    addHeading(detailPanel, topic.title, 3);
    addParagraph(detailPanel, topic.description);

    addHeading(detailPanel, "Salesforce Example");
    addParagraph(detailPanel, topic.example);

    addHeading(detailPanel, "Key Takeaway");
    addParagraph(detailPanel, topic.takeaway);
}

function updateProgress() {
    const completed = visitedTopics.size;
    const total = topics.length;
    const percentage = Math.round((completed / total) * 100);

    progressText.textContent =
        `${percentage}% Completed · ${completed} of ${total} topics`;

    progressFill.style.width = `${percentage}%`;
    progressTrack.setAttribute("aria-valuenow", String(percentage));

    completionMessage.hidden = completed !== total;
}

function selectTopic(topicId) {
    const topic = topics.find((item) => item.id === topicId);

    if (!topic) {
        return;
    }

    selectedTopicId = topicId;
    visitedTopics.add(topicId);

    renderCards();
    renderDetails(topic);
    updateProgress();
}

function resetProgress() {
    visitedTopics.clear();
    selectedTopicId = null;

    renderCards();
    renderDetails(null);
    updateProgress();
}

resetButton.addEventListener("click", resetProgress);

// Initial rendering
renderCards();
renderDetails(null);
updateProgress();
