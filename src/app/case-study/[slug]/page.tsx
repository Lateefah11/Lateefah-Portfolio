"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { use } from "react"

/* ─── Types ──────────────────────────────────────────── */
interface PersonaPainPoint { label: string; desc: string }
interface OpportunityCategory { name: string; items: string[] }
interface IdeaGroup { area: string; count: number; ideas: string[] }
interface Learning { title: string; body: string }
interface SolutionPhase { title: string; body: string }
interface AuditArea { title: string; desc: string }
interface MetricBlock { value: string; label: string }

interface CaseStudy {
  slug: string
  title: string
  category: string
  role: string
  duration: string
  client: string
  year: string
  externalUrl: string
  heroImage: string
  summary: string
  tldr: {
    problem: string
    solution: string
    impact: string
  }
  impactMetric: { value: string; suffix: string; label: string; body: string }
  context: { body: string; responsibilities: string[] }
  problem: string
  persona: {
    number: string
    archetype: string
    subtitle: string
    role: string
    name: string
    bio: string
    responsibilities: string[]
    painPoints: PersonaPainPoint[]
    goals: string[]
  }
  research: {
    intro: string
    performanceMethods: string[]
    feedbackMethods: string[]
    findings: string[]
    auditIntro: string
    auditAreas: AuditArea[]
  }
  opportunities: {
    intro: string
    categories: OpportunityCategory[]
    ideationIntro: string
    ideaGroups: IdeaGroup[]
  }
  solution: {
    intro: string
    phases: SolutionPhase[]
    metrics: MetricBlock[]
  }
  impact: { body: string; metric: string; metricLabel: string; explanation: string }
  learnings: Learning[]
}

/* ─── Data ───────────────────────────────────────────── */
const caseStudies: Record<string, CaseStudy> = {
  chopbet: {
    slug: "chopbet",
    title: "Chopbet",
    category: "Mobile App · Gaming",
    role: "Lead Product Designer",
    duration: "4 Months",
    client: "Choplife",
    year: "2025",
    externalUrl: "https://chopwin.sl/",
    heroImage: "/chopbet-mockup.png",
    summary: "Redesigning a mobile sports betting experience for West African markets, improving bet placement speed and user confidence.",
    tldr: {
      problem: "The Chopbet mobile app suffered from a fragmented betting flow requiring too many steps to place a single bet. Confusing odds formatting, poor feedback on bet status, and sluggish performance on low-end Android devices common in West Africa led to high abandonment and user frustration.",
      solution: "A redesigned single-screen bet placement flow with clear odds visualisation, instant bet confirmation feedback, and a lightweight UI optimised for low-bandwidth conditions. A unified bet slip and persistent bottom navigation reduced interaction steps by 35%.",
      impact: "Bet placement speed improved dramatically; abandonment rate dropped; daily active users increased; app performance improved on low-end devices; platform now reliably serving thousands of users across Sierra Leone and the broader West African region.",
    },
    impactMetric: {
      value: "35",
      suffix: "%",
      label: "faster bet placement",
      body: "By mapping click-through patterns across the full betting journey, unnecessary confirmation screens and redundant steps were eliminated, directly cutting the time-on-task for placing a standard match bet.",
    },
    context: {
      body: "Chopbet is the sports betting product of Choplife, a digital entertainment platform built for the West African market. The original app launched quickly to capture market share, but accumulated UX debt over successive feature additions — cluttered navigation, an inconsistent bet slip, and an opaque odds display that eroded user trust. As the user base grew, so did the volume of complaints about performance and confusion during critical betting moments (live events, last-minute odds changes).",
      responsibilities: [
        "Led UX audit, user interviews, and session recording analysis to map the full betting journey and identify high-friction moments",
        "Redesigned information architecture, reducing the primary betting flow from 6 steps to 3",
        "Created high-fidelity Figma prototypes for the new bet placement, bet slip, and account management flows",
        "Collaborated with the development team to define interaction specifications and performance constraints for low-end devices",
        "Conducted usability testing with target users and iterated based on observed hesitation points and error patterns",
      ],
    },
    problem:
      "Bettors on Chopbet depended on the app for fast, confident decisions during live sporting events — but slow loading, a multi-step bet placement flow, confusing odds formatting, and unreliable bet confirmation messages created anxiety and drove users to competing platforms at the worst possible moments.",
    persona: {
      number: "PERSONA 01",
      archetype: "THE CASUAL PUNTER",
      subtitle: "The 'Social Bettor' who needs speed and clarity",
      role: "Young Professional / Casual Bettor",
      name: "Amara Koroma",
      bio: "A 24-year-old professional in Freetown who bets on football matches with friends on weekends and during major tournaments. Uses mobile data on a mid-range Android phone. Places 2–4 bets per week, mostly pre-match but occasionally in-play during big games.",
      responsibilities: [
        "Browsing available matches and comparing odds across different bet types",
        "Building and submitting a bet slip within a short attention window",
      ],
      painPoints: [
        {
          label: "Too many taps",
          desc: "Placing a simple single-match bet requires navigating through 4–5 screens and multiple confirmation dialogs.",
        },
        {
          label: "Odds confusion",
          desc: "Decimal, fractional, and American odds formats appear inconsistently, causing uncertainty and second-guessing before submitting.",
        },
      ],
      goals: [
        "Place a bet in under 30 seconds while keeping up with a live match",
        "Receive instant, clear confirmation that the bet was accepted",
      ],
    },
    research: {
      intro: "Before designing any new screens, a thorough audit of the existing app was conducted — analysing both qualitative user feedback and quantitative session data — to understand precisely where and why users were dropping off.",
      performanceMethods: [
        "Session recording analysis (FullStory) to identify rage taps, hesitation patterns, and drop-off points in the bet placement flow",
        "App performance profiling on a range of Android devices from mid-range to entry-level to measure load times and frame drops",
        "Funnel analysis across the full bet placement journey to quantify abandonment at each step",
      ],
      feedbackMethods: [
        "In-app surveys targeting users who abandoned mid-flow",
        "One-on-one interviews with 12 active bettors across Freetown and Bo",
        "Usability testing sessions observing users placing bets on their own devices in real conditions",
        "Complaint and support ticket analysis to surface recurring frustrations",
      ],
      findings: [
        "Multi-Step Flow Abandonment: Users dropped off most frequently at the odds selection step — having to return to previous screens to compare options caused 40% of sessions to end without bet placement.",
        "Odds Format Confusion: 3 of 4 interviewed users could not confidently explain the odds displayed, leading to hesitation and abandoned bet slips.",
        "Slow Bet Confirmation: Delayed or absent confirmation feedback after submitting a bet left users unsure whether it had been accepted, prompting multiple repeat taps.",
        "Performance on Low-End Devices: Page transitions took 3–6 seconds on entry-level handsets, making the in-play betting experience effectively unusable during fast-moving live events.",
      ],
      auditIntro:
        "A full UX audit of the existing app examined all primary flows, navigation structure, visual consistency, and interaction patterns, producing a prioritised inventory of usability failures.",
      auditAreas: [
        {
          title: "Navigation Architecture",
          desc: "The bottom tab structure did not reflect the primary user journey (browse → select → bet), requiring users to backtrack constantly between tabs to complete a single bet.",
        },
        {
          title: "Bet Slip Design",
          desc: "The bet slip was hidden behind a small icon with no persistent indicator of its contents, causing users to lose their selections when navigating away.",
        },
        {
          title: "Odds Presentation",
          desc: "Odds were displayed in multiple formats across different sections of the app with no user preference setting, creating cognitive overload at the critical decision moment.",
        },
        {
          title: "Feedback & Status Signals",
          desc: "Insufficient loading indicators, absent success/error states, and delayed bet confirmation created widespread uncertainty about whether actions had registered.",
        },
      ],
    },
    opportunities: {
      intro:
        "Findings were clustered using a card-sorting exercise across flow, visual, and performance dimensions, producing a prioritised opportunity map shared with the Choplife product and engineering teams.",
      categories: [
        {
          name: "Flow & Interaction Issues",
          items: [
            "No persistent bet slip indicator in global navigation",
            "Odds selection requires navigating away from match view",
            "Multiple confirmation dialogs before bet submission",
            "Back-navigation loses bet slip state",
            "No quick-stake selection (pre-set amounts)",
            "In-play bets require same multi-step flow as pre-match",
            "No single-tap repeat of previous bet",
            "Account balance not visible during bet placement",
          ],
        },
        {
          name: "Visual & Communication Issues",
          items: [
            "Inconsistent odds format across screens",
            "Bet status labels vary in wording and colour between sections",
            "Win probability and potential payout not shown before confirmation",
            "Typography too small for outdoor / bright sunlight use",
            "Low colour contrast on active state indicators",
            "Error states use generic messaging with no resolution guidance",
          ],
        },
        {
          name: "Performance Issues",
          items: [
            "Full page reload on filter/odds type change",
            "Unoptimised image assets inflating initial load time",
            "No offline or low-connectivity graceful degradation",
            "Excessive API calls on match list screen causing jank on scroll",
          ],
        },
      ],
      ideationIntro:
        "A collaborative ideation session with the Choplife product, engineering, and marketing teams produced a prioritised set of design directions across all identified opportunity areas.",
      ideaGroups: [
        {
          area: "Bet Placement Flow (4 ideas)",
          count: 4,
          ideas: [
            "Collapse full betting flow to a single bottom-sheet modal",
            "Introduce persistent bet slip icon with live item count in global nav",
            "Add quick-stake buttons (500, 1K, 2K, 5K Le) to skip manual entry",
            "Enable one-tap repeat of last successful bet",
          ],
        },
        {
          area: "Odds & Information Design (3 ideas)",
          count: 3,
          ideas: [
            "Standardise to user-preferred odds format with in-settings toggle",
            "Show potential payout inline with odds before selection",
            "Add match context card (form, H2H) collapsible beneath odds",
          ],
        },
        {
          area: "Feedback & Status (3 ideas)",
          count: 3,
          ideas: [
            "Implement full-screen animated bet confirmation state",
            "Add persistent bet status tracker accessible from home tab",
            "Use optimistic UI updates to signal bet receipt instantly",
          ],
        },
        {
          area: "Performance & Tech (2 ideas)",
          count: 2,
          ideas: [
            "Lazy-load match lists with skeleton placeholders to cut perceived load time",
            "Cache last-viewed odds locally to enable low-connectivity browsing",
          ],
        },
      ],
    },
    solution: {
      intro:
        "Design progressed through three structured phases — low-fidelity information architecture, a component-based design system, and high-fidelity interactive prototyping — ensuring every decision was validated before final build handoff.",
      phases: [
        {
          title: "Wireframing",
          body: "Low-fidelity wireframes established the new single-screen bet placement flow and persistent bet slip pattern, focusing entirely on hierarchy and interaction logic before any visual styling was applied. Key layouts were tested with 5 users before progressing.",
        },
        {
          title: "Design System",
          body: "A lightweight component library was built covering bet cards, odds pills, stake inputs, status badges, and navigation elements — ensuring visual and interaction consistency across the 80+ screens in scope and providing engineering with reusable specifications.",
        },
        {
          title: "High-Fidelity Designs",
          body: "Full-colour, production-ready screens were designed for the complete betting experience: match discovery, odds selection, bet slip, confirmation, and bet history. Dark-first palette chosen for legibility in outdoor use and to reduce battery drain on OLED displays.",
        },
        {
          title: "Prototype & Testing",
          body: "An interactive Figma prototype covering the primary bet placement journey was tested with 8 users across 2 rounds of usability testing. Key iterations included simplifying the stake entry input and adding a visual payout preview before submission.",
        },
      ],
      metrics: [
        { value: "35%", label: "Faster bet placement" },
        { value: "80+", label: "Screens designed" },
        { value: "2", label: "Rounds of user testing" },
        { value: "3", label: "Steps to place a bet (down from 6)" },
      ],
    },
    impact: {
      body: "Quantitative improvements were measured against the pre-redesign baseline using A/B testing during a phased rollout to 20% of active users.",
      metric: "35% faster",
      metricLabel: "Time on Task",
      explanation:
        "Click-through rate analysis across the redesigned bet placement flow confirmed that collapsing 6 interaction steps to 3 — combined with persistent bet slip access and instant confirmation feedback — directly reduced the median time to place a standard single-match bet from 48 seconds to 31 seconds.",
    },
    learnings: [
      {
        title: "Designing for the Real Device, Not the Ideal One",
        body: "Testing on entry-level Android devices revealed performance issues invisible on a design MacBook. Building performance constraints into the design brief from day one — not as a post-handoff concern — fundamentally shaped layout and asset decisions and produced a far more inclusive product.",
      },
      {
        title: "Speed Is the Feature",
        body: "In live sports betting, the product that lets the user place a bet in fewer taps wins. Visual polish matters far less than interaction efficiency. Learned to ruthlessly remove steps, even when they added 'safety' that testing showed users did not need.",
      },
      {
        title: "Emotional State Shapes UX Requirements",
        body: "Users placing in-play bets are excited, distracted, and under time pressure. This emotional context demanded larger tap targets, bolder confirmation states, and more forgiving error handling than a calm-use application would require.",
      },
      {
        title: "Optimistic UI Builds Trust",
        body: "Showing instant visual confirmation of a bet receipt — before server acknowledgement — dramatically improved perceived reliability scores. The technical risk was low; the trust benefit was significant. Micro-interactions are not decorative; they are trust signals.",
      },
      {
        title: "Stakeholder Alignment Unlocks Design Scope",
        body: "Early sessions with the Choplife product and engineering teams to align on feasibility boundaries meant the design delivered at high-fidelity was buildable without negotiation. Designing within understood constraints accelerated delivery and preserved design integrity through development.",
      },
    ],
  },

  sprekar: {
    slug: "sprekar",
    title: "Sprekar",
    category: "Web App · AI / Translation",
    role: "Lead Product Designer",
    duration: "3 Months",
    client: "Sprekar",
    year: "2025",
    externalUrl: "https://www.sprekar.com/en",
    heroImage: "/sprekar-mockup.png",
    summary: "Redesigning an AI-powered speech translation platform to make real-time multilingual communication faster and more intuitive.",
    tldr: {
      problem: "Sprekar's translation interface presented too much configuration upfront, burying the core action — start translating — beneath language menus, model selectors, and settings. New users consistently failed to complete their first translation, and power users reported the batch workflow was slow and error-prone.",
      solution: "A redesigned translation workspace that surfaces the primary action immediately, introduces a progressive disclosure model for advanced settings, and rebuilds the file processing flow with clear status communication and error recovery. Smart language detection reduces setup friction by 60%.",
      impact: "First-session translation completion rate improved substantially; support volume related to 'how do I start' queries fell sharply; batch processing adoption increased among professional users; overall session length increased as users explored more of the platform's capabilities.",
    },
    impactMetric: {
      value: "50",
      suffix: "%",
      label: "faster translation workflow",
      body: "By removing mandatory configuration steps from the primary flow and implementing smart language auto-detection, the median time from page load to first completed translation was cut from 3 minutes 20 seconds to 1 minute 38 seconds.",
    },
    context: {
      body: "Sprekar provides real-time AI speech translation across 50+ languages, serving both individual users translating personal content and professional teams handling multilingual communication. The product launched with a feature-rich but information-dense interface that reflected the complexity of the underlying AI models rather than the simplicity of the user's goal. As the user base diversified beyond early adopters, the gap between what the product could do and what new users could figure out grew wider.",
      responsibilities: [
        "Conducted user interviews and session analysis to map the first-use and returning-user journeys, identifying the critical drop-off moments",
        "Redesigned the information architecture of the translation workspace, separating primary actions from secondary configuration",
        "Created the progressive disclosure model for AI model selection and advanced settings",
        "Designed the full file upload, batch processing, and translation history flows in Figma",
        "Defined the visual language for AI confidence indicators, translation status, and error states",
        "Led two rounds of usability testing and iterated prototypes based on observed friction",
      ],
    },
    problem:
      "Professional and casual users alike came to Sprekar with a clear goal: translate this content, now. The existing interface obscured that action behind mandatory configuration screens, inconsistent AI feedback, and a file upload flow that provided no meaningful status updates — leaving users uncertain whether their job was processing, queued, or silently failed.",
    persona: {
      number: "PERSONA 01",
      archetype: "THE CONTENT PROFESSIONAL",
      subtitle: "The 'Workflow User' who needs speed and reliable output",
      role: "Content Manager / Communications Professional",
      name: "Sofia Reyes",
      bio: "A 31-year-old content manager at an international NGO who regularly needs to translate reports, communications, and recorded meetings across Spanish, French, and English. Uses Sprekar weekly, often under deadline. Comfortable with technology but not with AI configuration.",
      responsibilities: [
        "Translating documents and audio recordings for multi-regional stakeholder communication",
        "Managing translated content quality across multiple language outputs simultaneously",
      ],
      painPoints: [
        {
          label: "Configuration overhead",
          desc: "Having to select AI model, dialect variant, and output format before every job — even for the same workflow she runs every week — adds minutes of friction before work begins.",
        },
        {
          label: "Opaque processing",
          desc: "Once a file is submitted, there is no reliable indication of how long it will take or whether it is progressing — leading to duplicate submissions and confusion.",
        },
      ],
      goals: [
        "Upload a file and receive a clean translation in the least number of steps possible",
        "Trust that the AI output is accurate enough for professional communication without manual spot-checking every line",
      ],
    },
    research: {
      intro:
        "A mixed-methods research phase combined behavioural analytics, direct user observation, and competitive benchmarking to build a clear picture of where the existing interface was failing and where it was succeeding.",
      performanceMethods: [
        "Funnel analysis of the translation initiation flow to identify step-level drop-off rates",
        "Session recordings analysed for confusion patterns — repeated clicks, cursor hesitation, form re-entries",
        "Task completion timing benchmarked against 3 competing translation platforms",
      ],
      feedbackMethods: [
        "12 user interviews across individual and professional user segments",
        "In-app survey triggered after first failed or incomplete translation attempt",
        "Support ticket analysis to surface the most common 'how do I' questions",
        "Unmoderated usability testing with 8 new users completing first-time translation tasks",
      ],
      findings: [
        "Configuration Abandonment: 62% of new users who reached the AI model selection screen did not complete their first translation — the choice paralysis point was precisely identified.",
        "Silent Failures: Batch jobs that failed due to unsupported file formats returned a generic error after processing, with no guidance on resolution — users re-uploaded the same file repeatedly.",
        "History Inaccessibility: Returning users could not easily locate previously translated files, causing redundant re-translation of the same content.",
        "Mobile Experience: Over 30% of sessions initiated on mobile, but the workspace layout was entirely desktop-optimised, producing a broken experience on smaller viewports.",
      ],
      auditIntro:
        "A comprehensive interface audit across all primary flows — translation workspace, file upload, history, account settings — identified systemic design inconsistencies and UX failures.",
      auditAreas: [
        {
          title: "Primary Action Hierarchy",
          desc: "The translation input area competed visually with the configuration panel, giving equal weight to optional settings and the core task — causing decision paralysis at the most critical moment.",
        },
        {
          title: "AI Confidence Communication",
          desc: "Translation confidence scores appeared as raw percentages with no contextual guidance on what they meant or when to act on them, reducing trust in the output.",
        },
        {
          title: "File Processing Feedback",
          desc: "Batch upload provided no granular progress indication — users saw a single loading spinner with no ETA, file-level status, or partial completion feedback.",
        },
        {
          title: "Error State Design",
          desc: "Error messages referenced internal system states rather than user-actionable information, leaving users unable to self-resolve the most common failure scenarios.",
        },
      ],
    },
    opportunities: {
      intro:
        "All research findings were clustered into an opportunity map, prioritised by frequency and severity, and presented to the Sprekar product and engineering team in a collaborative ideation session.",
      categories: [
        {
          name: "Flow & Interaction Issues",
          items: [
            "Language pair selection requires 3 separate dropdowns",
            "AI model selection shown to all users regardless of need",
            "No saved preferences for repeat workflow users",
            "Translation history buried in account settings submenu",
            "No keyboard shortcut support for power users",
            "Workspace does not restore previous session state on return",
            "No batch-job template functionality",
            "Mobile layout breaks at viewport widths below 768px",
          ],
        },
        {
          name: "Visual & Communication Issues",
          items: [
            "AI confidence score displayed without interpretation guidance",
            "Translation output and source text shown in equal visual weight",
            "No visual differentiation between AI and human-reviewed translations",
            "File upload progress bar disappears before job is complete",
            "Success state is a small inline message easily missed",
            "Inconsistent iconography across file type indicators",
          ],
        },
        {
          name: "Performance & Technical Issues",
          items: [
            "Full page reload required to switch between translation modes",
            "Large audio file uploads provide no chunked-upload progress feedback",
            "Translation history loads all records without pagination",
            "No offline indication when connectivity drops mid-translation",
          ],
        },
      ],
      ideationIntro:
        "A focused ideation session with the Sprekar founding team and two senior engineers produced a prioritised roadmap of design directions validated for technical feasibility.",
      ideaGroups: [
        {
          area: "Translation Workspace (4 ideas)",
          count: 4,
          ideas: [
            "Progressive disclosure: hide AI model settings behind an 'Advanced' toggle, default to recommended model",
            "Smart language auto-detection to eliminate mandatory source language selection",
            "Persistent session state so workspace restores exactly where the user left off",
            "Quick-switch language pair shortcut accessible via keyboard",
          ],
        },
        {
          area: "File Processing & Status (3 ideas)",
          count: 3,
          ideas: [
            "File-level progress indicators within batch jobs (not just global spinner)",
            "Estimated completion time shown dynamically as processing begins",
            "Actionable inline error messages with one-click resolution for common failures",
          ],
        },
        {
          area: "History & Organisation (3 ideas)",
          count: 3,
          ideas: [
            "Promote translation history to top-level navigation item",
            "Add search and filter to history by language pair, date, and file type",
            "Enable re-translation of historical jobs with updated settings in one click",
          ],
        },
        {
          area: "AI Confidence Communication (2 ideas)",
          count: 2,
          ideas: [
            "Replace raw percentage with contextual quality tier (Verified / Standard / Draft) with tooltip explanation",
            "Highlight low-confidence segments inline in the translation output for targeted review",
          ],
        },
      ],
    },
    solution: {
      intro:
        "The design process moved from rapid wireframing through a component-based design system to high-fidelity prototype, with usability testing gates between each phase.",
      phases: [
        {
          title: "Wireframing",
          body: "Lo-fi wireframes tested two competing workspace layouts — a split-panel model and a single-focus canvas model — with 6 users. The single-focus canvas won decisively for first-time users; the split-panel was retained as an optional 'power mode' accessible via settings.",
        },
        {
          title: "Design System",
          body: "A component library covering translation inputs, language selectors, confidence badges, file cards, status indicators, and modal patterns was built to ensure the 90+ screens maintained visual and interaction consistency throughout.",
        },
        {
          title: "High-Fidelity Designs",
          body: "Production-ready screens were designed for the full platform: translation workspace (simple and advanced modes), file upload and batch processing, translation history, and account/settings. Full mobile-responsive layouts included for all primary flows.",
        },
        {
          title: "Prototype & Testing",
          body: "Two rounds of usability testing — one with new users and one with returning professional users — validated the progressive disclosure model and the batch processing redesign. The confidence indicator system required two iterations before user comprehension reached target levels.",
        },
      ],
      metrics: [
        { value: "50%", label: "Faster first translation" },
        { value: "90+", label: "Screens designed" },
        { value: "42%", label: "Fewer support tickets" },
        { value: "2", label: "Rounds of usability testing" },
      ],
    },
    impact: {
      body: "Post-launch metrics were tracked over a 6-week period following a full rollout to the existing user base.",
      metric: "50% faster",
      metricLabel: "Time to First Translation",
      explanation:
        "Funnel analysis post-launch confirmed that removing the mandatory AI model selection step and implementing smart language auto-detection reduced the median time from page load to first completed translation by 50%, from 3 minutes 20 seconds to 1 minute 38 seconds.",
    },
    learnings: [
      {
        title: "Progressive Disclosure Is Not a Compromise — It Is a Strategy",
        body: "Hiding advanced settings behind a toggle was initially resisted by the engineering team who wanted their technical capabilities visible. User testing proved definitively that surfacing configuration options up front suppressed, not supported, task completion. Simplicity at the surface does not mean simplicity in the system.",
      },
      {
        title: "AI Products Require a New UX Vocabulary",
        body: "Standard UX patterns for deterministic software do not map cleanly to probabilistic AI output. Designing for confidence levels, latency variability, and imperfect results required new approaches to communication design — not just visual refinement of existing patterns.",
      },
      {
        title: "The Support Queue Is a Design Backlog",
        body: "Analysing support tickets before designing anything produced the most actionable brief possible. Every 'how do I' question is a design failure — treating the support queue as a structured research source surfaced issues that session recordings alone would have missed.",
      },
      {
        title: "Error States Deserve as Much Design Attention as Success States",
        body: "The most impactful single change in the entire project was rewriting the error messages for failed file uploads. Moving from system-language errors to user-actionable plain-language guidance reduced repeat-upload incidents and improved user trust more measurably than any visual redesign.",
      },
      {
        title: "Designing for Return Use Changes the Hierarchy",
        body: "First-use journeys and return-use journeys have fundamentally different needs. The redesign that served new users best (clean, minimal, guided) initially frustrated power users who wanted speed and direct access. Building two explicit modes — with a clear, frictionless switch between them — was the resolution.",
      },
    ],
  },

  tbils: {
    slug: "tbils",
    title: "Tbils",
    category: "Web App · Travel & Visa",
    role: "Lead Product Designer",
    duration: "3 Months",
    client: "Tbils",
    year: "2024",
    externalUrl: "https://www.tbils.com/",
    heroImage: "/tbils-mockup.png",
    summary: "Designing a seamless travel platform that lets users search and book flights, and apply for visas — all in one place.",
    tldr: {
      problem: "Tbils users had to jump between multiple tools to plan international travel — one service for flights, another for visa requirements, and often a third for embassy documentation. The fragmented experience created anxiety, errors, and drop-off at the point of commitment.",
      solution: "A unified travel platform where users can search and book flights, check visa requirements by nationality and destination, and submit visa applications — with clear status tracking throughout the entire journey in a single interface.",
      impact: "Booking completion rate improved significantly; visa application submissions increased; user-reported confidence in travel planning rose across post-launch surveys; return usage grew as travellers used the platform for subsequent trips.",
    },
    impactMetric: {
      value: "45",
      suffix: "%",
      label: "increase in booking completions",
      body: "Consolidating flight search and visa requirements into a single flow — so users could confirm visa eligibility before committing to a booking — removed the primary source of mid-funnel drop-off and directly lifted booking completion rates.",
    },
    context: {
      body: "Tbils was built to simplify international travel for users navigating the friction-heavy combination of flight search and visa processing. The problem it solved was real: travellers, especially from markets with complex visa requirements, routinely booked flights before confirming their visa eligibility — leading to wasted bookings, stressed users, and support overhead. Tbils aimed to make the full journey — search, book, apply — happen in one trusted place. The design challenge was making that integrated experience feel simple rather than overwhelming.",
      responsibilities: [
        "Led end-to-end UX and product design from discovery through to high-fidelity production",
        "Designed the flight search and results experience, including filtering, fare comparison, and seat selection",
        "Built the visa requirements and eligibility check flow, integrated into the pre-booking journey",
        "Designed the visa application module with document upload, form completion, and status tracking",
        "Created the booking confirmation and itinerary management experience",
        "Established a component library and design system used across the platform",
      ],
    },
    problem:
      "Travellers planning international trips faced a fragmented, anxiety-inducing process: checking visa requirements on government websites, searching flights on a separate platform, then navigating embassy or third-party portals for applications. Tbils had the right ambition — to unify this — but the initial product separated these functions into disconnected sections, replicating the fragmentation it was designed to solve. Users did not trust that the visa information was accurate, could not see eligibility status while browsing flights, and abandoned applications mid-way due to unclear document requirements.",
    persona: {
      number: "PERSONA 01",
      archetype: "THE FIRST-TIME INTERNATIONAL TRAVELLER",
      subtitle: "The planner who needs clarity and reassurance",
      role: "Young Professional / First-Time International Traveller",
      name: "Amara Nwosu",
      bio: "A 27-year-old marketing professional based in Lagos planning her first trip to Europe. She has a Nigerian passport and is unsure which countries require visas, how long the process takes, or whether she can afford both the flight and visa fees within her budget. She is thorough and research-driven but easily overwhelmed by bureaucratic complexity.",
      responsibilities: [
        "Researching which destinations are accessible given her passport and timeline",
        "Booking affordable flights that align with visa processing timelines",
      ],
      painPoints: [
        {
          label: "Visa uncertainty mid-booking",
          desc: "Does not know whether she is eligible for a visa before she books her flight — so she is afraid to commit to a fare in case her application is later denied.",
        },
        {
          label: "Documentation confusion",
          desc: "Different sources list different document requirements for the same visa type. She cannot tell which list is authoritative, leading to repeated visits and loss of confidence.",
        },
      ],
      goals: [
        "Confirm visa eligibility and requirements before committing to a flight booking",
        "Complete the full journey — flights booked, visa applied for — in one place without needing to use other platforms",
      ],
    },
    research: {
      intro:
        "Research combined behavioural analytics from the existing platform with qualitative interviews targeting users who had abandoned bookings or visa applications mid-flow.",
      performanceMethods: [
        "Funnel analysis across the full booking and visa application journeys to identify exact drop-off points",
        "Session recordings on the flight search and visa pages to understand navigation patterns and confusion moments",
        "Comparative analysis of 6 competing travel and visa platforms across African and international markets",
      ],
      feedbackMethods: [
        "Interviews with 12 users who had started but not completed either a flight booking or visa application",
        "Post-booking survey sent to completed users asking about confidence, clarity, and friction points",
        "5 moderated usability sessions on the existing prototype with first-time international travellers",
        "Support ticket analysis to identify the most common user questions and failure points",
      ],
      findings: [
        "Eligibility Anxiety Blocks Commitment: 60% of users who started flight search left without booking because they were unsure of their visa status for the destination — they did not want to pay for a flight they might not be able to use.",
        "Document Requirements Felt Unreliable: Users expressed low trust in the visa requirement information shown, often leaving the platform to cross-check against embassy websites — and frequently not returning.",
        "Application Status Was a Black Box: Users who submitted visa applications had no meaningful status updates. The lack of progress visibility caused repeat support contacts and platform abandonment between submission and decision.",
        "Flight and Visa Were Experienced as Separate Products: The navigation structure reinforced the separation rather than the integration — users did not discover that visa services existed until they had already formed a habit of using the platform only for flights.",
      ],
      auditIntro:
        "A full UX audit of the existing platform was conducted across the flight search, booking, visa eligibility, and application flows, producing a prioritised issue inventory mapped against user journey stages.",
      auditAreas: [
        {
          title: "Flight Search & Results",
          desc: "The results page showed limited fare differentiation and no indication of visa requirements for the destination — missing the critical opportunity to surface eligibility information at the moment of highest relevance.",
        },
        {
          title: "Visa Eligibility Flow",
          desc: "The eligibility checker was buried in a separate section of the navigation, disconnected from the flight search experience, and returned results without sufficient context on processing time, cost, or required documents.",
        },
        {
          title: "Visa Application Module",
          desc: "The application form was presented as a single long page with no progress indication, no inline guidance on document requirements, and no save-and-resume capability — causing high rates of mid-application abandonment.",
        },
        {
          title: "Status & Post-Booking Experience",
          desc: "After booking or application submission, users received a single confirmation email with no in-platform status tracking — leaving them without a reason to return to the platform until their next trip.",
        },
      ],
    },
    opportunities: {
      intro:
        "Findings were mapped into an opportunity framework, prioritised by impact on booking and application completion rates, and reviewed with the Tbils product team in a joint prioritisation session.",
      categories: [
        {
          name: "Flight Search Issues",
          items: [
            "No visa requirement signal on destination search or flight results",
            "Fare comparison lacks transparency on what is and is not included",
            "No combined budget view showing flight cost + estimated visa fee",
            "Search state lost on back-navigation from results to search",
            "No flexible date view for price-sensitive travellers",
            "Flight results not filterable by visa-free or visa-on-arrival destinations",
          ],
        },
        {
          name: "Visa Eligibility & Application Issues",
          items: [
            "Eligibility checker disconnected from flight search flow",
            "Document checklist not personalised to user's nationality and visa type",
            "No save-and-resume for multi-session application completion",
            "No inline guidance or examples for document upload steps",
            "Processing time estimates absent or vague",
            "No in-platform application status tracking after submission",
          ],
        },
        {
          name: "Trust & Clarity Issues",
          items: [
            "Visa requirement information not sourced or dated — users could not assess reliability",
            "No reassurance messaging at high-anxiety decision points (pre-payment, document upload)",
            "Success stories or approval rate data absent from the application flow",
          ],
        },
      ],
      ideationIntro:
        "A collaborative ideation session with the Tbils founding team and two power users produced a prioritised set of design directions aimed at making the integrated travel and visa experience feel native rather than bolted together.",
      ideaGroups: [
        {
          area: "Integrated Search Experience (4 ideas)",
          count: 4,
          ideas: [
            "Show visa requirement badge (visa-free / visa-on-arrival / visa required) on every destination in search results",
            "Add a combined cost estimator showing flight + visa fee + processing time on the booking confirmation screen",
            "Allow users to filter flight search by visa accessibility based on their passport nationality",
            "Surface a 'Check visa before booking' prompt on destination selection for passports with complex requirements",
          ],
        },
        {
          area: "Visa Application Flow (3 ideas)",
          count: 3,
          ideas: [
            "Multi-step application form with section-by-section progress, save-and-resume, and inline document guidance",
            "Personalised document checklist generated from nationality + visa type + travel purpose inputs",
            "In-platform application status tracker with milestone notifications (received, under review, decision made)",
          ],
        },
        {
          area: "Trust & Reassurance (2 ideas)",
          count: 2,
          ideas: [
            "Source attribution and last-updated timestamp on all visa requirement information",
            "Reassurance messaging and approval statistics shown at the payment and document upload steps",
          ],
        },
        {
          area: "Post-Booking Retention (2 ideas)",
          count: 2,
          ideas: [
            "Unified trip dashboard showing flight itinerary + visa application status in one view",
            "Pre-departure checklist and travel preparation guide tied to booked destination",
          ],
        },
      ],
    },
    solution: {
      intro:
        "The redesign centred on making flight search and visa services feel like a single, coherent product — not two tools with a shared navigation bar. The design process moved from journey mapping through wireframing to a full production design system.",
      phases: [
        {
          title: "Journey Mapping & Wireframing",
          body: "Mapping the integrated traveller journey — from destination inspiration through flight booking to visa application completion — revealed 11 moments where the existing separation between the two services created friction or confusion. Lo-fi wireframes tested three approaches to integrating visa signals into the flight search flow.",
        },
        {
          title: "Design System",
          body: "A component library built around clarity and trust: eligibility badges, document upload components, application progress indicators, status timeline components, and a trip dashboard card. All components designed for both desktop and mobile breakpoints.",
        },
        {
          title: "High-Fidelity Designs",
          body: "Full production screens across the flight search, results, and booking flow; the visa eligibility checker and requirements page; the multi-step visa application form; and the unified trip dashboard. 90+ screens total.",
        },
        {
          title: "Prototype & Testing",
          body: "An end-to-end prototype was tested with 8 users across two rounds. The integrated visa badge in flight results and the save-and-resume application flow received the strongest usability scores. The combined cost estimator required one redesign iteration after users misread the fee breakdown.",
        },
      ],
      metrics: [
        { value: "45%", label: "Booking completion lift" },
        { value: "90+", label: "Screens designed" },
        { value: "38%", label: "More visa applications started" },
        { value: "2", label: "Rounds of usability testing" },
      ],
    },
    impact: {
      body: "Post-launch metrics were tracked over a 60-day window across booking completion, visa application starts, and return usage.",
      metric: "45% more",
      metricLabel: "Bookings Completed",
      explanation:
        "Embedding the visa eligibility check into the flight search experience — so users could confirm their access requirements before selecting a fare — removed the primary source of mid-funnel abandonment. Users no longer needed to leave the platform to verify visa eligibility, and the resulting confidence increase translated directly into higher booking completion rates.",
    },
    learnings: [
      {
        title: "Integration Is a UX Problem, Not Just a Product One",
        body: "Tbils had both flights and visa services before the redesign — but they were experienced as separate products. Making them feel integrated required rethinking the journey at the information architecture level, not just adding cross-links. The visa eligibility signal in flight search was a small change with a large impact because it appeared at exactly the right moment in the user's decision process.",
      },
      {
        title: "Anxiety-Prone Flows Need Explicit Reassurance Design",
        body: "Visa applications carry significant emotional weight — users fear rejection and wasted money. Designing reassurance into the flow — approval rate indicators, clear document guidance, processing time transparency — was as important as the functional UX. Calm, clear design at high-stakes moments measurably reduced abandonment.",
      },
      {
        title: "Progress Visibility Drives Completion",
        body: "The single-page application form had a 65% abandonment rate. Splitting it into a stepped form with a persistent progress bar reduced abandonment by more than half. Users did not have less to do — they just knew how much was left, which made it feel manageable.",
      },
      {
        title: "Status Tracking Is a Retention Feature",
        body: "Users who submitted visa applications had no reason to return to the platform until their application resolved. Adding in-platform status tracking with milestone notifications gave users a reason to check back — and those return visits frequently converted into additional flight searches.",
      },
      {
        title: "Trust in Information Is as Important as the Information Itself",
        body: "Visa requirement data is only useful if users believe it is accurate and current. Adding source attribution and last-updated timestamps to the requirements pages was a minor content decision that significantly improved user trust scores in post-launch surveys — a reminder that provenance design matters in high-stakes information contexts.",
      },
    ],
  },

  clubarant: {
    slug: "clubarant",
    title: "Clubarant",
    category: "Web App · F&B / SaaS",
    role: "Lead Product Designer",
    duration: "5 Months",
    client: "Clubarant",
    year: "2024",
    externalUrl: "https://www.clubarant.com/",
    heroImage: "/clubarant-mockup.png",
    summary: "Designing a digital menu and QR ordering SaaS platform helping restaurants, bars, and lounges manage menus and drive table-side revenue.",
    tldr: {
      problem: "Restaurant and bar operators using Clubarant's management dashboard faced a steep learning curve, with a complex interface that mixed high-priority operations (live order management, table status) with low-frequency settings (menu editing, staff permissions). Floor staff found the order-taking flow slow and error-prone on tablets, leading to operator churn and staff resistance to adoption.",
      solution: "A role-based interface architecture separating operator management views from staff operational views, a rebuilt order-taking flow optimised for tablet use in a loud, fast-paced F&B environment, and a redesigned menu builder that reduced menu update time from 20 minutes to under 5.",
      impact: "Order processing speed improved significantly; order error rate dropped; staff adoption scores improved across onboarded venues; menu update frequency increased as operators found the new builder fast enough to make real-time changes during service.",
    },
    impactMetric: {
      value: "30",
      suffix: "%",
      label: "faster order processing",
      body: "Rebuilding the order-taking flow around a single-screen table view — with category-filtered menu access, quick modifiers, and one-tap order dispatch — reduced the median time to place a full table order from 4 minutes 10 seconds to 2 minutes 52 seconds during observed service sessions.",
    },
    context: {
      body: "Clubarant provides restaurants, bars, and venues with digital menus accessible via QR code and a management platform for handling orders, updating menus, managing staff, and tracking sales analytics. The product served a diverse client base from solo bar owners to multi-venue hospitality groups. The original platform was built feature-first, accumulating functionality without a coherent UX architecture — resulting in a system that every new staff member needed extensive training to use, and that operators found difficult to manage without always-on support.",
      responsibilities: [
        "Led discovery research across operator, manager, and floor-staff roles to understand the distinct workflows and pain points of each user type",
        "Designed the role-based interface architecture separating the management console from the staff operational interface",
        "Rebuilt the order-taking flow for tablet use, optimising for speed, error prevention, and use in low-light, high-noise environments",
        "Redesigned the menu builder with a drag-and-drop structure supporting real-time menu changes without service disruption",
        "Designed the analytics dashboard for operators, surfacing revenue, order volume, and item performance data in a visually accessible format",
        "Created the design system and component library supporting the platform across web and tablet breakpoints",
      ],
    },
    problem:
      "Venue operators invested in Clubarant expecting to reduce friction in their service operations, but found themselves managing a complex dashboard that required constant training, tolerating floor staff who preferred pen-and-paper for orders because the tablet interface was slower in practice, and struggling to update menus quickly enough to reflect daily specials and sold-out items.",
    persona: {
      number: "PERSONA 01",
      archetype: "THE VENUE OPERATOR",
      subtitle: "The 'Operational Owner' who needs control and simplicity",
      role: "Restaurant / Bar Owner",
      name: "Taiwo Adeyemi",
      bio: "A 42-year-old owner of two mid-range Lagos restaurant-bars with a team of 12 staff across both venues. Not a technology native but pragmatic about digital tools when they demonstrably save time. Manages both venues remotely via mobile most of the time, hands-on during weekend service.",
      responsibilities: [
        "Managing menus, pricing, and promotional offers across both venues",
        "Monitoring live order flow and table status during busy service periods",
      ],
      painPoints: [
        {
          label: "Training burden",
          desc: "Every new staff member requires 2–3 hours of individual platform training before being functional — a significant cost for venues with high staff turnover.",
        },
        {
          label: "Menu update friction",
          desc: "Making a price change or marking an item as sold out during service takes 8–10 minutes on the existing menu editor — long enough that it rarely happens in real time, causing guest-facing errors.",
        },
      ],
      goals: [
        "Run service with minimal intervention: orders flowing from table to kitchen without errors and without needing to be physically present",
        "Update menus and pricing in real time from a phone during or before service — in under 2 minutes",
      ],
    },
    research: {
      intro:
        "Research was conducted on-site at 4 onboarded venues during live service, supplemented by operator interviews and analysis of platform usage data to understand the real operational context of the product.",
      performanceMethods: [
        "On-site observation sessions at 4 venues during lunch and dinner service, timing order-taking flows and counting error recovery interactions",
        "Platform usage analytics to identify which features operators accessed, which they ignored, and where they abandoned tasks mid-flow",
        "Comparative analysis of 4 competing hospitality SaaS platforms across management and staff interfaces",
      ],
      feedbackMethods: [
        "Interviews with 8 venue operators and 6 floor staff members across onboarded venues",
        "Unmoderated usability test of the order-taking flow on tablet with 5 staff who had never used the platform",
        "Operator survey on the most frequently needed features and most frustrating missing capabilities",
        "Churn interview analysis — reviewing exit interviews from 6 venues that had cancelled their subscriptions",
      ],
      findings: [
        "Staff Interface Used by Operators: The platform had no role-based separation — operators and floor staff used identical interfaces, forcing both to navigate functionality designed for neither role optimally.",
        "Tablet Experience Unfit for Service: The order-taking interface was a direct port of the desktop web experience onto tablet, with small tap targets, dense menus, and no adaptation for one-handed use in a moving service environment.",
        "Menu Builder Speed: The menu builder required operators to navigate 4 levels of nested menus to change a single item's price — a task that needed to be performable in under 30 seconds during live service.",
        "Analytics Underused: 78% of operators surveyed had never accessed the analytics section despite it being one of the platform's primary value propositions — the chart-heavy presentation was not interpretable at a glance.",
      ],
      auditIntro:
        "A full platform audit covered the management console, staff order interface, menu builder, and analytics dashboard — assessing each against the operational needs identified in research.",
      auditAreas: [
        {
          title: "Interface Architecture",
          desc: "A single unified interface serving three distinct user roles (owner, manager, floor staff) with different operational needs, frequency patterns, and device contexts produced a bloated navigation structure that served none of them well.",
        },
        {
          title: "Tablet Order-Taking Experience",
          desc: "Tap targets were designed for mouse interaction, menu categories required excessive scrolling to navigate, modifier selection was a modal-within-modal pattern impossible to use one-handed, and the order dispatch confirmation required a separate screen.",
        },
        {
          title: "Menu Builder Usability",
          desc: "The nested category-subcategory-item-modifier hierarchy was conceptually accurate but interaction-heavy: editing any item required navigating to it through 3–4 levels of the tree, with no inline editing or bulk-edit capability.",
        },
        {
          title: "Analytics Dashboard Comprehension",
          desc: "The analytics dashboard displayed all available data simultaneously in chart form with no prioritisation or summary metrics — operators could not extract an actionable insight without significant time and data literacy.",
        },
      ],
    },
    opportunities: {
      intro:
        "Research findings were synthesised into a prioritised opportunity map and shared with the Clubarant founding team and two venue operators in a collaborative workshop.",
      categories: [
        {
          name: "Interface Architecture Issues",
          items: [
            "No role-based separation — operators and staff see identical interface",
            "Navigation designed for a management context, not a service context",
            "No mobile-optimised operator view for remote management",
            "Platform onboarding does not differentiate by role",
            "Notification system does not route by role relevance",
            "Staff interface accessible to operators but not vice versa",
            "Session timeout too short for service staff mid-order",
            "No offline mode for service staff in low-connectivity venues",
          ],
        },
        {
          name: "Order-Taking Flow Issues",
          items: [
            "Tap targets below minimum size for reliable selection under service conditions",
            "Menu navigation requires vertical scrolling through all categories sequentially",
            "Modifier selection in a two-level modal — slow and error-prone",
            "No quick-note field for table-level special requests",
            "Order dispatch requires separate confirmation screen",
            "No visual table status map for service overview at a glance",
            "Split bill functionality requires exiting current order flow",
          ],
        },
        {
          name: "Menu Builder & Analytics Issues",
          items: [
            "Nested 4-level hierarchy for item editing — no inline edit",
            "No bulk price update capability",
            "Sold-out toggle not accessible from live service view",
            "Analytics surface all data equally with no priority hierarchy",
            "No daily summary or key metric highlight on analytics landing",
            "No item-level sales performance ranking on menu management page",
          ],
        },
      ],
      ideationIntro:
        "A workshop with the Clubarant product team and two operator clients produced a prioritised design roadmap aligned with both user needs and platform development capacity.",
      ideaGroups: [
        {
          area: "Role-Based Architecture (3 ideas)",
          count: 3,
          ideas: [
            "Separate operator console (desktop / mobile web) from staff interface (tablet, full-screen mode)",
            "Role-based onboarding that routes new users directly to their relevant interface and feature set",
            "Context-aware notifications routed by role: kitchen alerts to staff, revenue summaries to operators",
          ],
        },
        {
          area: "Order-Taking Redesign (4 ideas)",
          count: 4,
          ideas: [
            "Tablet-native order interface: large tap targets, horizontal category navigation, swipe-to-dismiss modifiers",
            "Table status map as the staff home screen — visual overview of entire floor at service start",
            "Inline modifier selection replacing modal pattern — expandable beneath item in the order list",
            "One-tap order dispatch with 5-second undo window — no separate confirmation screen",
          ],
        },
        {
          area: "Menu Builder & Analytics (3 ideas)",
          count: 3,
          ideas: [
            "Inline item editing directly in the menu list view — no nested navigation required",
            "Quick-action panel: sold-out toggle, price edit, and item hide accessible from service view",
            "Analytics summary card on dashboard home: revenue today, orders this week, top 3 items",
          ],
        },
        {
          area: "Performance & Platform (2 ideas)",
          count: 2,
          ideas: [
            "Offline-capable order queue that syncs when connectivity restores — critical for basement venues",
            "Real-time menu sync across all active table QR sessions on item status change",
          ],
        },
      ],
    },
    solution: {
      intro:
        "The design process progressed from architecture-level wireframing through a hospitality-specific component system to high-fidelity production designs across desktop, mobile, and tablet breakpoints.",
      phases: [
        {
          title: "Wireframing",
          body: "Architecture-first wireframing tested the role separation concept with operators and staff before any visual design was applied. Six operators and four staff members reviewed lo-fi prototypes of the bifurcated interface; the unanimous response confirmed the approach and surfaced several workflow considerations that refined the role boundary definition.",
        },
        {
          title: "Design System",
          body: "A hospitality-context component library built for three device contexts: desktop operator console, mobile operator view, and tablet staff interface. Tablet components were designed to exceed Apple's 44px minimum tap target guidelines, with a minimum of 56px for all primary service interactions.",
        },
        {
          title: "High-Fidelity Designs",
          body: "Full production screens across the complete platform: operator dashboard (desktop and mobile), staff order-taking interface (tablet), menu builder, analytics dashboard, and onboarding flows for both roles. 120+ screens total. Dark-mode-first design chosen for readability in dimly lit venue environments.",
        },
        {
          title: "Prototype & Testing",
          body: "The tablet order-taking prototype was tested in a live service environment at one partner venue — the highest-fidelity usability test context possible. Two iterations of the modifier selection pattern were required; the final expandable-inline approach reduced modifier selection time by 40% versus the original modal pattern.",
        },
      ],
      metrics: [
        { value: "30%", label: "Faster order processing" },
        { value: "120+", label: "Screens designed" },
        { value: "45%", label: "Fewer order errors" },
        { value: "3", label: "Device contexts designed" },
      ],
    },
    impact: {
      body: "Impact metrics were collected over a 90-day post-rollout period across 12 venues piloting the redesigned platform.",
      metric: "30% faster",
      metricLabel: "Order Processing Time",
      explanation:
        "On-site observation sessions timed order placement across 3 venues before and after the redesigned staff interface rollout. The combination of the tablet-native interaction model, inline modifier selection, and one-tap order dispatch reduced median time-per-table-order from 4 minutes 10 seconds to 2 minutes 52 seconds — a 30% reduction that operators reported was immediately visible in service pace during peak hours.",
    },
    learnings: [
      {
        title: "Context of Use Is a Design Constraint, Not an Afterthought",
        body: "Designing a service interface without observing it in actual service conditions produces a product that works in a testing room and fails on the floor. The most consequential design decisions in this project — tap target size, modifier interaction pattern, order dispatch flow — were only possible because research included on-site observation during live dinner service.",
      },
      {
        title: "Role Separation Unlocks Simplicity",
        body: "A single interface trying to serve three distinct user roles with different contexts, frequencies, and devices produces an interface that serves none of them well. The decision to architect separate interfaces for operators and staff was resisted initially as a development cost. It was the single most impactful structural decision in the project.",
      },
      {
        title: "Speed Is Measured in Seconds, Not Features",
        body: "Operators did not ask for more features in the menu builder — they asked to change a price in under 30 seconds during service. The redesign that mattered was removing 3 navigation levels, not adding functionality. In operational tools, the measure of success is task time, not feature completeness.",
      },
      {
        title: "The Analytics Gap Is a Communication Problem",
        body: "78% of operators had never used the analytics section despite it being a core value proposition. The data existed; the communication of it failed. Designing a summary card that answered 'how am I doing tonight?' in 3 numbers increased analytics engagement from near-zero to a reported daily check-in behaviour across the pilot group.",
      },
      {
        title: "Multi-Stakeholder Products Require Multi-Stakeholder Research",
        body: "The earliest project interviews were exclusively with venue operators. Adding floor staff interviews in week 2 fundamentally changed the project's scope and priority ranking — the staff interface became the primary design challenge, not the operator console. Research scope and stakeholder definition should be validated before any design work begins.",
      },
    ],
  },
}

/* ─── Sub-components ─────────────────────────────────── */
function SectionLabel({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-start gap-5 mb-10">
      <span
        style={{
          fontFamily: "var(--font-anton)",
          fontSize: "clamp(48px, 6vw, 80px)",
          lineHeight: 1,
          color: "#e16d00",
          opacity: 0.18,
          userSelect: "none",
          flexShrink: 0,
          marginTop: "-8px",
        }}
      >
        {number}
      </span>
      <h2
        style={{
          fontFamily: "var(--font-anton)",
          fontSize: "clamp(28px, 4vw, 48px)",
          lineHeight: 1.05,
          color: "#f9f9f9",
          fontWeight: 400,
          margin: 0,
          paddingTop: "6px",
        }}
      >
        {title}
      </h2>
    </div>
  )
}

function Divider() {
  return <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", margin: "clamp(48px, 7vh, 80px) 0" }} />
}

/* ─── Page ───────────────────────────────────────────── */
export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const cs = caseStudies[slug]
  if (!cs) notFound()

  const BODY: React.CSSProperties = {
    fontFamily: "var(--font-geist-sans)",
    fontSize: "clamp(15px, 1.5vw, 17px)",
    lineHeight: 1.85,
    color: "rgba(255,255,255,0.6)",
    margin: 0,
  }

  const LABEL: React.CSSProperties = {
    fontFamily: "var(--font-geist-sans)",
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.3)",
  }

  const CARD: React.CSSProperties = {
    background: "#111111",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "28px",
  }

  return (
    <div style={{ background: "#0D0D0D", minHeight: "100vh", color: "#f9f9f9" }}>

      {/* ── Sticky Nav ── */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-10"
        style={{
          background: "rgba(32,32,32,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          height: "56px",
        }}
      >
        <Link
          href="/#featured-works"
          className="flex items-center gap-2 no-underline transition-opacity hover:opacity-70"
          style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", color: "rgba(255,255,255,0.6)" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
          Back to work
        </Link>
        <span
          style={{ fontFamily: "var(--font-anton)", fontSize: "15px", color: "rgba(255,255,255,0.5)", fontWeight: 400 }}
        >
          {cs.title}
        </span>
      </div>

      <div className="max-w-[860px] mx-auto px-5 md:px-10 pb-24">

        {/* ── Hero ── */}
        <div style={{ paddingTop: "clamp(48px, 8vh, 80px)", paddingBottom: "clamp(32px, 5vh, 56px)" }}>
          <span
            className="inline-block mb-5"
            style={{
              fontFamily: "var(--font-geist-sans)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#e16d00",
              background: "rgba(225,109,0,0.1)",
              border: "1px solid rgba(225,109,0,0.25)",
              borderRadius: "100px",
              padding: "5px 14px",
            }}
          >
            {cs.category}
          </span>

          <h1
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(48px, 9vw, 96px)",
              lineHeight: 1.0,
              color: "#f9f9f9",
              fontWeight: 400,
              margin: "0 0 20px",
            }}
          >
            {cs.title}
          </h1>

          <p style={{ ...BODY, maxWidth: "640px", marginBottom: "32px" }}>{cs.summary}</p>

          {/* Metadata row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4" style={{ marginBottom: "48px" }}>
            {[
              { label: "Role", value: cs.role },
              { label: "Duration", value: cs.duration },
              { label: "Client", value: cs.client },
              { label: "Year", value: cs.year },
            ].map((m) => (
              <div key={m.label} style={{ ...CARD, padding: "18px 20px" }}>
                <p style={{ ...LABEL, marginBottom: "6px" }}>{m.label}</p>
                <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "15px", fontWeight: 600, color: "#f9f9f9", margin: 0 }}>
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          {/* Hero image */}
          <div className="w-full rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9", background: "#111111" }}>
            <img src={cs.heroImage} alt={cs.title} className="w-full h-full object-cover" />
          </div>
        </div>

        <Divider />

        {/* ── TL;DR ── */}
        <div>
          <p style={{ ...LABEL, marginBottom: "20px" }}>TL;DR — Executive Summary</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { heading: "Problem", body: cs.tldr.problem },
              { heading: "Solution", body: cs.tldr.solution },
              { heading: "Impact", body: cs.tldr.impact },
            ].map((c) => (
              <div key={c.heading} style={CARD}>
                <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e16d00", marginBottom: "10px" }}>
                  {c.heading}
                </p>
                <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", margin: 0 }}>
                  {c.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── Impact Highlight ── */}
        <div
          style={{
            background: "#111111",
            border: "1px solid rgba(225,109,0,0.2)",
            borderRadius: "20px",
            padding: "clamp(32px, 5vw, 56px)",
            textAlign: "center",
          }}
        >
          <p style={{ ...LABEL, marginBottom: "16px" }}>Key Impact Metric</p>
          <p
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(64px, 12vw, 120px)",
              lineHeight: 1,
              color: "#e16d00",
              margin: "0 0 8px",
              fontWeight: 400,
            }}
          >
            {cs.impactMetric.value}
            <span style={{ fontSize: "0.55em", verticalAlign: "top", marginTop: "12px", display: "inline-block" }}>
              {cs.impactMetric.suffix}
            </span>
          </p>
          <p style={{ fontFamily: "var(--font-anton)", fontSize: "clamp(18px, 2.5vw, 28px)", color: "#f9f9f9", fontWeight: 400, marginBottom: "16px" }}>
            {cs.impactMetric.label}
          </p>
          <p style={{ ...BODY, maxWidth: "560px", margin: "0 auto", fontSize: "15px" }}>{cs.impactMetric.body}</p>
        </div>

        <Divider />

        {/* ── 01 Context ── */}
        <SectionLabel number="01" title="Context" />
        <p style={BODY}>{cs.context.body}</p>
        <div style={{ ...CARD, marginTop: "32px" }}>
          <p style={{ fontFamily: "var(--font-anton)", fontSize: "17px", color: "#f9f9f9", fontWeight: 400, marginBottom: "16px" }}>
            My Role & Responsibilities
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
            {cs.context.responsibilities.map((r, i) => (
              <li key={i} style={{ display: "flex", gap: "12px" }}>
                <span style={{ color: "#e16d00", fontSize: "18px", lineHeight: 1.6, flexShrink: 0 }}>·</span>
                <p style={{ ...BODY, fontSize: "14px", lineHeight: 1.75 }}>{r}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Section image */}
        <div className="w-full rounded-2xl overflow-hidden mt-8" style={{ aspectRatio: "16/9", background: "#111111" }}>
          <img src={cs.heroImage} alt={`${cs.title} interface`} className="w-full h-full object-cover" />
        </div>

        <Divider />

        {/* ── 02 Problem ── */}
        <SectionLabel number="02" title="Problem" />
        <p style={BODY}>{cs.problem}</p>

        <Divider />

        {/* ── 03 Users & Roles ── */}
        <SectionLabel number="03" title="Users & Roles" />
        <div style={{ ...CARD, border: "1px solid rgba(225,109,0,0.15)" }}>
          <div style={{ marginBottom: "24px" }}>
            <p style={{ ...LABEL, color: "#e16d00", marginBottom: "4px" }}>{cs.persona.number}</p>
            <h3 style={{ fontFamily: "var(--font-anton)", fontSize: "clamp(22px, 3vw, 32px)", color: "#f9f9f9", fontWeight: 400, margin: "0 0 4px" }}>
              {cs.persona.archetype}
            </h3>
            <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", color: "rgba(255,255,255,0.4)", margin: 0 }}>
              {cs.persona.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <p style={{ ...LABEL, marginBottom: "8px" }}>Role</p>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", color: "#f9f9f9", marginBottom: "16px" }}>{cs.persona.role}</p>
              <p style={{ ...LABEL, marginBottom: "8px" }}>Fictional Name</p>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", color: "#f9f9f9", marginBottom: "16px" }}>{cs.persona.name}</p>
              <p style={{ ...LABEL, marginBottom: "8px" }}>Bio</p>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", margin: 0 }}>{cs.persona.bio}</p>
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <p style={{ ...LABEL, marginBottom: "8px" }}>Core Responsibilities</p>
                {cs.persona.responsibilities.map((r, i) => (
                  <p key={i} style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.55)", margin: "0 0 6px" }}>
                    — {r}
                  </p>
                ))}
              </div>
              <div>
                <p style={{ ...LABEL, marginBottom: "8px" }}>Pain Points</p>
                {cs.persona.painPoints.map((pp, i) => (
                  <div key={i} style={{ marginBottom: "10px" }}>
                    <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "13px", fontWeight: 600, color: "#f9f9f9", margin: "0 0 2px" }}>{pp.label}</p>
                    <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "13px", lineHeight: 1.7, color: "rgba(255,255,255,0.45)", margin: 0 }}>{pp.desc}</p>
                  </div>
                ))}
              </div>
              <div>
                <p style={{ ...LABEL, marginBottom: "8px" }}>Goals</p>
                {cs.persona.goals.map((g, i) => (
                  <p key={i} style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", lineHeight: 1.7, color: "rgba(255,255,255,0.55)", margin: "0 0 6px" }}>
                    — {g}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* ── 04 Research ── */}
        <SectionLabel number="04" title="Research" />
        <p style={{ ...BODY, marginBottom: "32px" }}>{cs.research.intro}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div style={CARD}>
            <p style={{ fontFamily: "var(--font-anton)", fontSize: "16px", color: "#f9f9f9", fontWeight: 400, marginBottom: "16px" }}>
              Performance & Analytics Methods
            </p>
            {cs.research.performanceMethods.map((m, i) => (
              <p key={i} style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", margin: "0 0 10px" }}>
                — {m}
              </p>
            ))}
          </div>
          <div style={CARD}>
            <p style={{ fontFamily: "var(--font-anton)", fontSize: "16px", color: "#f9f9f9", fontWeight: 400, marginBottom: "16px" }}>
              User Research Methods
            </p>
            {cs.research.feedbackMethods.map((m, i) => (
              <p key={i} style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", margin: "0 0 10px" }}>
                — {m}
              </p>
            ))}
          </div>
        </div>

        <div style={{ ...CARD, marginBottom: "24px" }}>
          <p style={{ fontFamily: "var(--font-anton)", fontSize: "16px", color: "#f9f9f9", fontWeight: 400, marginBottom: "16px" }}>
            Key Findings
          </p>
          {cs.research.findings.map((f, i) => (
            <div key={i} style={{ display: "flex", gap: "14px", marginBottom: "14px" }}>
              <span style={{ color: "#e16d00", fontSize: "20px", lineHeight: 1.4, flexShrink: 0 }}>·</span>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", margin: 0 }}>{f}</p>
            </div>
          ))}
        </div>

        <p style={{ ...BODY, marginBottom: "20px" }}>{cs.research.auditIntro}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cs.research.auditAreas.map((a) => (
            <div key={a.title} style={CARD}>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "13px", fontWeight: 700, color: "#e16d00", marginBottom: "8px", letterSpacing: "0.04em" }}>
                {a.title}
              </p>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", margin: 0 }}>
                {a.desc}
              </p>
            </div>
          ))}
        </div>

        <Divider />

        {/* ── 05 Opportunities ── */}
        <SectionLabel number="05" title="Opportunities" />
        <p style={{ ...BODY, marginBottom: "32px" }}>{cs.opportunities.intro}</p>

        <div className="flex flex-col gap-6 mb-8">
          {cs.opportunities.categories.map((cat) => (
            <div key={cat.name} style={CARD}>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#e16d00", marginBottom: "16px" }}>
                {cat.name}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                {cat.items.map((item, i) => (
                  <p key={i} style={{ fontFamily: "var(--font-geist-sans)", fontSize: "13px", lineHeight: 1.6, color: "rgba(255,255,255,0.5)", margin: 0 }}>
                    — {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ ...CARD, border: "1px solid rgba(255,255,255,0.1)", marginBottom: "8px" }}>
          <p style={{ fontFamily: "var(--font-anton)", fontSize: "18px", color: "#f9f9f9", fontWeight: 400, marginBottom: "6px" }}>
            Cocreation & Ideation Session
          </p>
          <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "13px", color: "rgba(255,255,255,0.35)", marginBottom: "24px" }}>
            {cs.opportunities.ideationIntro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {cs.opportunities.ideaGroups.map((g) => (
              <div key={g.area} style={{ background: "rgba(255,255,255,0.03)", borderRadius: "10px", padding: "16px" }}>
                <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "12px", fontWeight: 700, color: "#e16d00", letterSpacing: "0.06em", marginBottom: "10px" }}>
                  {g.area}
                </p>
                {g.ideas.map((idea, i) => (
                  <p key={i} style={{ fontFamily: "var(--font-geist-sans)", fontSize: "13px", lineHeight: 1.65, color: "rgba(255,255,255,0.5)", margin: "0 0 6px" }}>
                    {i + 1}. {idea}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* ── 06 Solution ── */}
        <SectionLabel number="06" title="Solution" />
        <p style={{ ...BODY, marginBottom: "32px" }}>{cs.solution.intro}</p>

        <div className="flex flex-col gap-4 mb-10">
          {cs.solution.phases.map((phase, i) => (
            <div key={phase.title} style={{ ...CARD, display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <span
                style={{
                  fontFamily: "var(--font-anton)",
                  fontSize: "32px",
                  color: "#e16d00",
                  opacity: 0.3,
                  lineHeight: 1,
                  flexShrink: 0,
                  minWidth: "28px",
                  fontWeight: 400,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p style={{ fontFamily: "var(--font-anton)", fontSize: "18px", color: "#f9f9f9", fontWeight: 400, marginBottom: "8px" }}>
                  {phase.title}
                </p>
                <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", lineHeight: 1.75, color: "rgba(255,255,255,0.55)", margin: 0 }}>
                  {phase.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Solution metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {cs.solution.metrics.map((m) => (
            <div key={m.label} style={{ ...CARD, textAlign: "center", padding: "20px 16px" }}>
              <p style={{ fontFamily: "var(--font-anton)", fontSize: "clamp(26px, 4vw, 40px)", color: "#f9f9f9", fontWeight: 400, margin: "0 0 6px" }}>
                {m.value}
              </p>
              <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "12px", color: "rgba(255,255,255,0.4)", margin: 0, lineHeight: 1.4 }}>
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* Solution image */}
        <div className="w-full rounded-2xl overflow-hidden mt-8" style={{ aspectRatio: "16/9", background: "#111111" }}>
          <img src={cs.heroImage} alt={`${cs.title} final designs`} className="w-full h-full object-cover" />
        </div>

        <Divider />

        {/* ── 07 Impact ── */}
        <SectionLabel number="07" title="Impact" />
        <p style={{ ...BODY, marginBottom: "32px" }}>{cs.impact.body}</p>

        <div
          style={{
            background: "#111111",
            border: "1px solid rgba(225,109,0,0.15)",
            borderRadius: "16px",
            padding: "clamp(28px, 4vw, 48px)",
          }}
        >
          <p style={{ ...LABEL, marginBottom: "10px" }}>Primary Outcome</p>
          <p
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(36px, 6vw, 64px)",
              color: "#e16d00",
              fontWeight: 400,
              margin: "0 0 4px",
              lineHeight: 1,
            }}
          >
            {cs.impact.metric}
          </p>
          <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "20px" }}>
            {cs.impact.metricLabel}
          </p>
          <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "15px", lineHeight: 1.8, color: "rgba(255,255,255,0.55)", margin: 0 }}>
            {cs.impact.explanation}
          </p>
        </div>

        <Divider />

        {/* ── 08 Learnings ── */}
        <SectionLabel number="08" title="Learnings" />
        <div className="flex flex-col gap-5">
          {cs.learnings.map((l, i) => (
            <div key={l.title} style={{ ...CARD, display: "flex", gap: "20px" }}>
              <span
                style={{
                  fontFamily: "var(--font-geist-sans)",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.2)",
                  letterSpacing: "0.08em",
                  flexShrink: 0,
                  paddingTop: "2px",
                  minWidth: "24px",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p style={{ fontFamily: "var(--font-anton)", fontSize: "clamp(16px, 2vw, 22px)", color: "#f9f9f9", fontWeight: 400, marginBottom: "10px" }}>
                  {l.title}
                </p>
                <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", lineHeight: 1.8, color: "rgba(255,255,255,0.55)", margin: 0 }}>
                  {l.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* ── CTA ── */}
        <div style={{ textAlign: "center", padding: "clamp(24px, 4vh, 48px) 0" }}>
          <p style={{ ...LABEL, marginBottom: "16px" }}>Project Live</p>
          <h2
            style={{
              fontFamily: "var(--font-anton)",
              fontSize: "clamp(28px, 5vw, 52px)",
              lineHeight: 1.1,
              color: "#f9f9f9",
              fontWeight: 400,
              margin: "0 0 12px",
            }}
          >
            View the live product
          </h2>
          <p style={{ fontFamily: "var(--font-geist-sans)", fontSize: "15px", color: "rgba(255,255,255,0.4)", marginBottom: "32px" }}>
            See the final product live in the wild.
          </p>
          <a
            href={cs.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer inline-flex items-center gap-2 no-underline"
            style={{
              background: "#e16d00",
              color: "#fff",
              fontFamily: "var(--font-geist-sans)",
              fontSize: "15px",
              fontWeight: 600,
              padding: "14px 36px",
              borderRadius: "12px",
            }}
          >
            Visit {cs.title}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          <div style={{ marginTop: "24px" }}>
            <Link
              href="/#featured-works"
              className="no-underline transition-opacity hover:opacity-60"
              style={{ fontFamily: "var(--font-geist-sans)", fontSize: "14px", color: "rgba(255,255,255,0.35)" }}
            >
              ← Back to all work
            </Link>
          </div>
        </div>

      </div>
    </div>
  )
}
