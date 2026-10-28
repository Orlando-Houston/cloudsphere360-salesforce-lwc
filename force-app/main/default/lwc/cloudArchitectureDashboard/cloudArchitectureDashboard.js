
import { LightningElement } from 'lwc';

export default class CloudArchitectureDashboard extends LightningElement {
    selectedTopic = null;
    visitedTopics = [];

    topics = [
        {
            id: 'architecture',
            title: 'Cloud Architecture',
            subtitle: 'SaaS, PaaS and IaaS',
            icon: 'utility:cloud',
            description: 'Cloud computing delivers computing resources and services over the internet. SaaS provides ready-to-use software, PaaS provides a development platform, and IaaS provides infrastructure resources.',
            example: 'Salesforce CRM is a SaaS solution. The Salesforce Platform provides PaaS capabilities for developing applications with Apex and Lightning Web Components.'
        },
        {
            id: 'security',
            title: 'Cloud Security',
            subtitle: 'Access and Data Protection',
            icon: 'utility:lock',
            description: 'Cloud security protects applications, identities and data through authentication, authorization, encryption and monitoring.',
            example: 'Salesforce uses profiles, permission sets, organization-wide defaults, sharing rules and field-level security to control access.'
        },
        {
            id: 'data',
            title: 'Data Cloud',
            subtitle: 'Data Integration and Unification',
            icon: 'utility:database',
            description: 'Data platforms ingest, harmonize and unify information from multiple sources to support analytics and business decisions.',
            example: 'Salesforce Data 360, formerly Data Cloud, provides capabilities for integrating, harmonizing and activating customer data.'
        },
        {
            id: 'integration',
            title: 'Cloud Integration',
            subtitle: 'APIs and Connectivity',
            icon: 'utility:connected_apps',
            description: 'Cloud integration connects applications and systems so they can exchange data securely through APIs and other integration patterns.',
            example: 'Apex HTTP callouts can integrate Salesforce with external REST APIs. Named Credentials help manage endpoint configuration and authentication.'
        },
        {
            id: 'monitoring',
            title: 'Cloud Monitoring',
            subtitle: 'Logs and Performance',
            icon: 'utility:chart',
            description: 'Monitoring helps developers investigate failures, observe application behavior and improve reliability.',
            example: 'Salesforce Debug Logs help troubleshoot Apex execution. Event Monitoring provides additional visibility where licensed and available.'
        },
        {
            id: 'deployment',
            title: 'Cloud Deployment',
            subtitle: 'DevOps and CI/CD',
            icon: 'utility:upload',
            description: 'Deployment moves application changes through development, testing and production environments. Version control and automated validation reduce release risks.',
            example: 'Salesforce CLI and GitHub can support source-driven development, automated tests and metadata deployment across Salesforce orgs.'
        }
    ];

    get progress() {
        return Math.round(
            (this.visitedTopics.length / this.topics.length) * 100
        );
    }

    handleTopicClick(event) {
        const topicId = event.currentTarget.dataset.id;

        this.selectedTopic = this.topics.find(
            topic => topic.id === topicId
        );

        if (!this.visitedTopics.includes(topicId)) {
            this.visitedTopics = [...this.visitedTopics, topicId];
        }
    }

    handleReset() {
        this.visitedTopics = [];
        this.selectedTopic = null;
    }
}
