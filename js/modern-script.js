// Modern Portfolio JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollAnimations();
    initializeTypingEffect();
    initializeProficiencyBars();
    initializeScrollIndicator();
    initializeThemeToggle();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Keep subtle dark background at all times for contrast
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';

        // Update active nav link based on scroll position
        updateActiveNavLink();
        
        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.skill-item, .project-card, .experience-item, .highlight-item, .publication-item'
    );
    
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Typing effect for hero section
function initializeTypingEffect() {
    const roles = [
        'AI Engineer',
        'Data Scientist',
        'ML Engineer',
        'Full-stack Developer'
    ];
    
    const roleElement = document.querySelector('.title-role');
    if (!roleElement) return;
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeRole() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(typeRole, typeSpeed);
    }

    // Start typing effect after a delay
    setTimeout(typeRole, 1000);
}

// Proficiency bars animation
function initializeProficiencyBars() {
    const proficiencyBars = document.querySelectorAll('.proficiency-fill');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    proficiencyBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Scroll indicator
function initializeScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// Theme toggle (for future dark mode implementation)
function initializeThemeToggle() {
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Future implementation for theme toggle button
    // const themeToggle = document.getElementById('theme-toggle');
    // if (themeToggle) {
    //     themeToggle.addEventListener('click', function() {
    //         const currentTheme = document.documentElement.getAttribute('data-theme');
    //         const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    //         
    //         document.documentElement.setAttribute('data-theme', newTheme);
    //         localStorage.setItem('theme', newTheme);
    //     });
    // }
}

// Project details modal
function showProjectDetails(projectId) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    const projectDetails = {
        'ai-assistant': {
            title: 'Enterprise AI Assistant Platform',
            content: `
                <div class="project-detail">
                    <h4>Project Overview</h4>
                    <p>Developed a sophisticated AI assistant platform designed to simplify how teams access and interact with enterprise data. The platform features two specialized assistants built on a scalable, distributed architecture.</p>
                    
                    <h4>Key Features</h4>
                    <ul>
                        <li><strong>Dual Assistant System:</strong> Knowledge base search assistant and SQL query generation assistant</li>
                        <li><strong>Human-in-the-Loop Security:</strong> Manager approval workflow for all database queries</li>
                        <li><strong>Scalable Architecture:</strong> Three-tier distributed system with clean separation of concerns</li>
                        <li><strong>Advanced AI Integration:</strong> Leveraging latest LLM capabilities with custom prompt engineering</li>
                        <li><strong>Production-Ready Security:</strong> Connection isolation and comprehensive audit trails</li>
                    </ul>
                    
                    <h4>Technical Implementation</h4>
                    <ul>
                        <li><strong>Backend:</strong> Python, FastAPI, custom MCP server integration</li>
                        <li><strong>AI/ML:</strong> Large Language Models, Vector embeddings, RAG architecture</li>
                        <li><strong>Frontend:</strong> React, TypeScript, modern responsive design</li>
                        <li><strong>Security:</strong> OAuth integration, role-based access control, query approval workflow</li>
                        <li><strong>Architecture:</strong> Microservices, containerized deployment, auto-scaling</li>
                    </ul>
                    
                    <h4>Business Impact</h4>
                    <ul>
                        <li><strong>Executive Recognition:</strong> Praised by VP for rapid iterations and velocity</li>
                        <li><strong>Production Integration:</strong> Approved for integration into core enterprise workflows</li>
                        <li><strong>Efficiency Gains:</strong> Streamlined data access reducing manual query workload</li>
                        <li><strong>Strategic Value:</strong> Enables self-service data access across non-technical teams</li>
                    </ul>
                    
                    <h4>Technical Challenges Solved</h4>
                    <ul>
                        <li>Implemented secure LLM-to-database integration with approval controls</li>
                        <li>Designed scalable architecture handling multiple concurrent users</li>
                        <li>Created intelligent query routing between different data sources</li>
                        <li>Built robust error handling and fallback mechanisms</li>
                    </ul>
                </div>
            `
        },
        'nlq-tool': {
            title: 'AI-Powered Natural Language Query Tool',
            content: `
                <div class="project-detail">
                    <h4>Project Overview</h4>
                    <p>Developed a web-based AI platform that enables non-technical users to query large databases using natural language, successfully mitigating major business risks from legacy system decommissioning.</p>
                    
                    <h4>Problem Statement</h4>
                    <p>Legacy system decommissioning was creating a critical business risk where non-technical teams would lose access to essential data, potentially causing operational bottlenecks and requiring expensive manual workarounds.</p>
                    
                    <h4>Solution Architecture</h4>
                    <ul>
                        <li><strong>AI Query Engine:</strong> Advanced natural language to SQL translation</li>
                        <li><strong>Schema Discovery:</strong> Intelligent database schema understanding and mapping</li>
                        <li><strong>User Interface:</strong> Intuitive conversational interface hiding SQL complexity</li>
                        <li><strong>Enterprise Integration:</strong> Secure cloud database connectivity</li>
                        <li><strong>Result Visualization:</strong> Dynamic charts and tables for query results</li>
                    </ul>
                    
                    <h4>Technical Implementation</h4>
                    <ul>
                        <li><strong>AI/NLP:</strong> Advanced prompt engineering for SQL generation</li>
                        <li><strong>Backend:</strong> Python, FastAPI, database connection pooling</li>
                        <li><strong>Frontend:</strong> React, data visualization libraries, responsive design</li>
                        <li><strong>Database:</strong> Multi-database support with dynamic schema discovery</li>
                        <li><strong>Security:</strong> Role-based access, query validation, connection encryption</li>
                    </ul>
                    
                    <h4>Key Features</h4>
                    <ul>
                        <li>Natural language query processing with high accuracy</li>
                        <li>Real-time query validation and suggestion system</li>
                        <li>Interactive result visualization and export capabilities</li>
                        <li>Query history and favorites for repeated use</li>
                        <li>Multi-user support with role-based permissions</li>
                    </ul>
                    
                    <h4>Business Impact</h4>
                    <ul>
                        <li><strong>Risk Mitigation:</strong> Prevented data access bottlenecks for multiple teams</li>
                        <li><strong>Self-Service Analytics:</strong> Empowered non-technical users to access data independently</li>
                        <li><strong>Cost Savings:</strong> Reduced need for additional analyst hires</li>
                        <li><strong>Operational Continuity:</strong> Ensured smooth transition during system migration</li>
                    </ul>
                </div>
            `
        },
        'legacy-analysis': {
            title: 'AI-Assisted Legacy System Analysis',
            content: `
                <div class="project-detail">
                    <h4>Project Overview</h4>
                    <p>Pioneered an innovative AI-assisted methodology to reverse engineer and analyze complex legacy data pipelines, condensing what would typically be a 6-month manual process into just a few weeks.</p>
                    
                    <h4>Challenge</h4>
                    <p>Legacy system migration required comprehensive understanding of over 80 interconnected components with complex business logic, undocumented dependencies, and years of accumulated technical debt.</p>
                    
                    <h4>AI-Assisted Methodology</h4>
                    <ul>
                        <li><strong>Automated Code Analysis:</strong> AI-powered parsing of SQL scripts and Python orchestrators</li>
                        <li><strong>Business Logic Extraction:</strong> Systematic documentation of complex transformation rules</li>
                        <li><strong>Dependency Mapping:</strong> Automated discovery of system interconnections</li>
                        <li><strong>Data Lineage Tracking:</strong> Complete field-level mapping across systems</li>
                        <li><strong>Migration Planning:</strong> AI-generated recommendations for system modernization</li>
                    </ul>
                    
                    <h4>Technical Approach</h4>
                    <ul>
                        <li><strong>Static Code Analysis:</strong> Custom parsers for legacy SQL and Python code</li>
                        <li><strong>AI Processing:</strong> LLM-powered business logic understanding</li>
                        <li><strong>Data Mapping:</strong> Automated field mapping with confidence scoring</li>
                        <li><strong>Documentation Generation:</strong> Structured output for migration planning</li>
                        <li><strong>Validation Framework:</strong> Cross-referencing and accuracy verification</li>
                    </ul>
                    
                    <h4>Key Achievements</h4>
                    <ul>
                        <li><strong>Oracle EBS:</strong> 100% complete field mapping achieved</li>
                        <li><strong>Salesforce CRM:</strong> 89% complete mapping with identified gaps</li>
                        <li><strong>Process Innovation:</strong> Created reusable methodology for future migrations</li>
                        <li><strong>Time Efficiency:</strong> 95% reduction in analysis time</li>
                    </ul>
                    
                    <h4>Business Impact</h4>
                    <ul>
                        <li><strong>Strategic Enablement:</strong> Provided foundation for executive decommissioning decisions</li>
                        <li><strong>Resource Optimization:</strong> Freed up months of analyst time for higher-value work</li>
                        <li><strong>Risk Reduction:</strong> Comprehensive analysis reduced migration risks</li>
                        <li><strong>Methodology Innovation:</strong> Established new standard for AI-assisted system analysis</li>
                    </ul>
                    
                    <h4>Tools & Technologies</h4>
                    <ul>
                        <li>Python for automated analysis and processing</li>
                        <li>Large Language Models for business logic interpretation</li>
                        <li>Custom parsing frameworks for legacy code</li>
                        <li>Database analysis and schema comparison tools</li>
                        <li>Documentation automation and reporting systems</li>
                    </ul>
                </div>
            `
        },
        'healthcare-rag': {
            title: 'Advanced RAG for Healthcare Applications',
            content: `
                <div class="project-detail">
                    <h4>Research Overview</h4>
                    <p>Conducted cutting-edge research on AI-driven solutions leveraging Large Language Models, vector embeddings, and sophisticated Retrieval-Augmented Generation (RAG) techniques for healthcare guideline generation in collaboration with Cleveland Clinic.</p>
                    
                    <h4>Research Focus Areas</h4>
                    
                    <h5>Database and Query Construction</h5>
                    <ul>
                        <li><strong>Relational Databases:</strong> Natural language to SQL conversion with vector enhancement</li>
                        <li><strong>Graph Databases:</strong> Natural language to Cypher query language for complex relationships</li>
                        <li><strong>Vector Databases:</strong> Self-query retrieval with auto-generated metadata filters</li>
                    </ul>
                    
                    <h5>Query Translation and Optimization</h5>
                    <ul>
                        <li><strong>Query Decomposition:</strong> Breaking down complex queries with Step-back and RAG-Fusion strategies</li>
                        <li><strong>Pseudo-documents:</strong> HYDE-based hypothetical document generation</li>
                        <li><strong>Multi-query Strategies:</strong> Parallel query processing for comprehensive results</li>
                    </ul>
                    
                    <h5>Advanced Routing Mechanisms</h5>
                    <ul>
                        <li><strong>Logical Routing:</strong> LLM-based database selection based on query context</li>
                        <li><strong>Semantic Routing:</strong> Embedding-based similarity matching for optimal data source selection</li>
                        <li><strong>Dynamic Routing:</strong> Real-time adaptation based on query complexity and requirements</li>
                    </ul>
                    
                    <h5>Sophisticated Retrieval Techniques</h5>
                    <ul>
                        <li><strong>Ranking and Filtering:</strong> Re-Rank, RankGPT, and RAG-Fusion for relevance optimization</li>
                        <li><strong>Corrective RAG (CRAG):</strong> Evaluator integration with knowledge refining and search steps</li>
                        <li><strong>Active Retrieval:</strong> Self-correcting systems with web-based knowledge augmentation</li>
                    </ul>
                    
                    <h5>Advanced Indexing Strategies</h5>
                    <ul>
                        <li><strong>Chunk Optimization:</strong> Semantic splitter for optimal embedding chunk sizes</li>
                        <li><strong>Multi-representation Indexing:</strong> Parent Document and Dense X strategies</li>
                        <li><strong>Specialized Embeddings:</strong> Domain-specific fine-tuning and ColBERT implementations</li>
                        <li><strong>Hierarchical Indexing:</strong> RAPTOR-based tree summarization at multiple abstraction levels</li>
                    </ul>
                    
                    <h5>Generation Enhancement</h5>
                    <ul>
                        <li><strong>Self-RAG:</strong> Generation quality feedback for query refinement</li>
                        <li><strong>RRR (Retrieve, Rewrite, Retrieve):</strong> Iterative improvement cycles</li>
                        <li><strong>Quality Assessment:</strong> Real-time generation evaluation and correction</li>
                    </ul>
                    
                    <h4>Healthcare Application</h4>
                    <ul>
                        <li><strong>Guideline Generation:</strong> AI-powered creation of medical guidelines from research literature</li>
                        <li><strong>Evidence Synthesis:</strong> Automated aggregation of medical evidence from multiple sources</li>
                        <li><strong>Clinical Decision Support:</strong> Context-aware recommendations for healthcare providers</li>
                        <li><strong>Knowledge Base Integration:</strong> Seamless integration with existing medical knowledge systems</li>
                    </ul>
                    
                    <h4>Technical Innovations</h4>
                    <ul>
                        <li>Novel multi-database query orchestration system</li>
                        <li>Advanced embedding fine-tuning for medical domain</li>
                        <li>Hierarchical knowledge representation for complex medical concepts</li>
                        <li>Real-time quality assessment and correction mechanisms</li>
                    </ul>
                    
                    <h4>Research Impact</h4>
                    <ul>
                        <li><strong>Methodological Advancement:</strong> Contributed to state-of-the-art RAG techniques</li>
                        <li><strong>Healthcare Innovation:</strong> Demonstrated AI potential for clinical decision support</li>
                        <li><strong>Technical Excellence:</strong> Developed reusable frameworks for complex RAG systems</li>
                        <li><strong>Academic Contribution:</strong> Advanced understanding of multi-modal information retrieval</li>
                    </ul>
                </div>
            `
        },
        'gps-analysis': {
            title: 'GPS-Based Driving Behavior Analysis',
            content: `
                <div class="project-detail">
                    <h4>Project Overview</h4>
                    <p>Developed a deep learning approach for analyzing driving behavior from GPS trajectory data, focusing on detecting dangerous driving patterns to improve traffic safety.</p>
                    
                    <h4>Problem Statement</h4>
                    <p>Traditional methods for identifying dangerous drivers relied on manual analysis or simple rule-based systems. This project aimed to create an automated, accurate system for classifying driving behavior using only GPS data.</p>
                    
                    <h4>Technical Approach</h4>
                    
                    <h5>Feature Engineering</h5>
                    <ul>
                        <li><strong>Statistical Analysis:</strong> Advanced statistical techniques for GPS trajectory feature extraction</li>
                        <li><strong>Harsh Acceleration Detection:</strong> Analysis of velocity changes to identify aggressive acceleration patterns</li>
                        <li><strong>Harsh Braking Identification:</strong> Detection of sudden deceleration events indicating dangerous braking</li>
                        <li><strong>Harsh Turning Analysis:</strong> Angle change analysis in trajectory for detecting aggressive turning behavior</li>
                        <li><strong>CDF-based Labeling:</strong> Cumulative Distribution Function analysis for automated trajectory labeling</li>
                    </ul>
                    
                    <h5>Deep Learning Model</h5>
                    <ul>
                        <li><strong>Architecture:</strong> Custom neural network designed for GPS trajectory classification</li>
                        <li><strong>Input Processing:</strong> Multi-dimensional trajectory feature vectors</li>
                        <li><strong>Pattern Recognition:</strong> Automated detection of driving behavior patterns</li>
                        <li><strong>Classification:</strong> Binary classification for safe vs. unsafe driving behavior</li>
                    </ul>
                    
                    <h4>Key Innovations</h4>
                    <ul>
                        <li><strong>Feature Extraction Model:</strong> Novel statistical approach for GPS trajectory analysis</li>
                        <li><strong>Automated Labeling:</strong> CDF-based methodology for creating labeled training data</li>
                        <li><strong>Computational Efficiency:</strong> Optimized model with reduced computational overhead</li>
                        <li><strong>High Accuracy:</strong> Demonstrated superior performance compared to traditional methods</li>
                    </ul>
                    
                    <h4>Technical Implementation</h4>
                    <ul>
                        <li><strong>Data Processing:</strong> Python-based GPS trajectory preprocessing and cleaning</li>
                        <li><strong>Feature Engineering:</strong> Custom algorithms for extracting behavioral indicators</li>
                        <li><strong>Deep Learning:</strong> TensorFlow/PyTorch implementation of classification model</li>
                        <li><strong>Evaluation:</strong> Comprehensive testing on diverse driving scenario datasets</li>
                    </ul>
                    
                    <h4>Applications & Impact</h4>
                    <ul>
                        <li><strong>Traffic Safety:</strong> Automated identification of high-risk drivers</li>
                        <li><strong>Insurance Applications:</strong> Data-driven risk assessment for vehicle insurance</li>
                        <li><strong>Fleet Management:</strong> Driver behavior monitoring for commercial fleets</li>
                        <li><strong>Smart City Integration:</strong> Real-time traffic safety monitoring systems</li>
                    </ul>
                    
                    <h4>Research Contributions</h4>
                    <ul>
                        <li><strong>Methodology:</strong> Novel approach combining statistical analysis with deep learning</li>
                        <li><strong>Performance:</strong> High accuracy with reduced computational requirements</li>
                        <li><strong>Practical Application:</strong> Real-world applicable solution for traffic safety</li>
                        <li><strong>Scalability:</strong> Framework adaptable to different GPS data sources and formats</li>
                    </ul>
                    
                    <h4>Publication</h4>
                    <p>This work was published in the Emerging Global Trends in Engineering and Technology (EGTET 2022) conference, contributing to the academic understanding of AI applications in transportation safety.</p>
                </div>
            `
        }
    };
    
    const project = projectDetails[projectId];
    if (project) {
        modalTitle.textContent = project.title;
        modalBody.innerHTML = project.content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Publication details modal
function showPublicationDetails(publicationId) {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    
    const publicationDetails = {
        'gps-paper': {
            title: 'Driving behavior analysis using Deep Learning on GPS data',
            content: `
                <div class="publication-detail">
                    <h4>Abstract</h4>
                    <p>Aggressive drivers are often considered to violate traffic rules and adopt dangerous driving behavior. This requires the development of effective and robust classifiers for unsafe drivers. Driving behavior analysis is the classification of driving behavior based on the driver's GPS trajectory. With ever-increasing GPS trajectory data, dangerous driving behavior can be thoroughly analyzed and better classified using a deep learning model. Behavioral analytics can help us analyze and identify dangerous drivers that contribute to traffic safety and promote safe driving behavior.</p>
                    
                    <h4>Methodology</h4>
                    <p>In this paper, we propose a novel feature extraction model using a statistical approach to extract the important features from the GPS trajectory data and label the trajectory. To overcome the dataset dependency, we propose to use a deep learning model on our labeled data and finally classify the safe and unsafe drivers. The proposed method demonstrates high accuracy with reduced computational overhead.</p>
                    
                    <h4>Key Contributions</h4>
                    <ul>
                        <li>Novel statistical feature extraction methodology for GPS trajectory analysis</li>
                        <li>Automated labeling system using Cumulative Distribution Function (CDF) analysis</li>
                        <li>Deep learning model optimized for driving behavior classification</li>
                        <li>Reduced computational overhead while maintaining high accuracy</li>
                        <li>Practical framework for real-world traffic safety applications</li>
                    </ul>
                    
                    <h4>Technical Details</h4>
                    <ul>
                        <li><strong>Feature Engineering:</strong> Statistical analysis of GPS coordinates, velocity, and acceleration</li>
                        <li><strong>Harsh Event Detection:</strong> Identification of aggressive acceleration, braking, and turning</li>
                        <li><strong>Trajectory Labeling:</strong> CDF-based approach for safe/unsafe classification</li>
                        <li><strong>Model Architecture:</strong> Optimized neural network for binary classification</li>
                        <li><strong>Performance Optimization:</strong> Computational efficiency improvements</li>
                    </ul>
                    
                    <h4>Results & Impact</h4>
                    <ul>
                        <li>High classification accuracy for dangerous driving detection</li>
                        <li>Reduced computational requirements compared to existing methods</li>
                        <li>Practical applicability for real-time traffic monitoring systems</li>
                        <li>Contribution to traffic safety and accident prevention research</li>
                    </ul>
                    
                    <h4>Publication Details</h4>
                    <ul>
                        <li><strong>Conference:</strong> Emerging Global Trends in Engineering and Technology (EGTET 2022)</li>
                        <li><strong>Authors:</strong> Saurabh Singh, Utkarsh Anand, Anurag Patel, Debojit Boro</li>
                        <li><strong>Institution:</strong> Tezpur University</li>
                        <li><strong>Year:</strong> 2022</li>
                    </ul>
                </div>
            `
        }
    };
    
    const publication = publicationDetails[publicationId];
    if (publication) {
        modalTitle.textContent = publication.title;
        modalBody.innerHTML = publication.content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Performance optimizations
window.addEventListener('load', function() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Preload critical resources
    const criticalResources = [
        'css/modern-style.css',
        'js/modern-script.js'
    ];

    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
});

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        // Show placeholder if image fails to load
        const placeholder = e.target.nextElementSibling;
        if (placeholder && placeholder.classList.contains('profile-placeholder')) {
            placeholder.style.display = 'flex';
        }
    }
}, true);

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
    document.head.appendChild(script);
}

// Contact form handling (for future implementation)
function handleContactForm(e) {
    e.preventDefault();
    // Implementation for contact form submission
    console.log('Contact form submitted');
}

// Analytics tracking (for future implementation)
function trackEvent(category, action, label) {
    // Implementation for analytics tracking
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showProjectDetails,
        showPublicationDetails,
        closeModal,
        handleContactForm,
        trackEvent
    };
}
