// Sample content for different content types when backend is unavailable

export function getSampleContent(contentType: string): string {
  switch (contentType) {
    case "blog-post":
      return getBlogPostSample()
    case "social-media":
      return getSocialMediaSample()
    case "product-description":
      return getProductDescriptionSample()
    case "email-newsletter":
      return getEmailNewsletterSample()
    default:
      return getBlogPostSample()
  }
}

function getBlogPostSample(): string {
  return `# The Future of AI in Content Creation

## Introduction

Artificial Intelligence (AI) has revolutionized numerous industries, and content creation is no exception. As we move further into the digital age, AI-powered tools are becoming increasingly sophisticated, offering content creators unprecedented capabilities to streamline their workflows and enhance their creative output.

## How AI is Transforming Content Creation

### Automated Content Generation

AI can now generate human-like text for various purposes, from blog posts and articles to product descriptions and social media updates. These tools analyze vast amounts of data to understand context, tone, and style, producing content that resonates with specific audiences.

### Enhanced Editing and Optimization

Beyond creation, AI assists in refining content through advanced grammar checking, readability analysis, and SEO optimization. These capabilities ensure that content is not only well-written but also strategically positioned for maximum impact.

### Personalization at Scale

One of the most significant advantages of AI in content creation is the ability to personalize content for different audience segments without multiplying the workload. AI can adapt messaging, examples, and recommendations based on user data, creating more relevant experiences.

## Balancing AI and Human Creativity

While AI offers remarkable efficiency and capabilities, the most effective content strategies combine technological advantages with human creativity and oversight. The human touch remains essential for:

- Infusing authentic brand voice and personality
- Making nuanced ethical judgments
- Providing original insights and perspectives
- Creating emotional connections with audiences

## Looking Ahead

As AI technology continues to evolve, we can expect even more sophisticated tools that further blur the line between human and machine-generated content. The content creators who thrive will be those who learn to leverage AI as a powerful collaborator rather than viewing it as a replacement.

## Conclusion

The future of content creation lies in the harmonious partnership between human creativity and artificial intelligence. By embracing AI tools while maintaining our unique human perspective, we can create content that is not only more efficient to produce but also more effective at engaging and delighting our audiences.`
}

function getSocialMediaSample(): string {
  return `✨ Exciting news! We've just launched our AI-powered content creation platform that helps you generate engaging posts in seconds! 

🚀 Whether you're a social media manager juggling multiple accounts or a business owner trying to maintain a consistent online presence, our tool is designed to make your life easier.

💡 Key features:
• Generate platform-specific content
• Customize tone and style to match your brand
• Schedule posts directly from our dashboard
• Get analytics on engagement and reach

🔍 Early users are seeing a 40% increase in engagement and saving 5+ hours per week on content creation.

Try it free for 14 days - link in bio!

#ContentCreation #AITools #SocialMediaMarketing #DigitalMarketing #ProductivityHacks #ContentStrategy`
}

function getProductDescriptionSample(): string {
  return `# UltraFocus Noise-Cancelling Headphones

## Experience Audio Perfection

Introducing the UltraFocus Noise-Cancelling Headphones – where cutting-edge technology meets unparalleled comfort for the ultimate listening experience.

## Key Features

- **Advanced Active Noise Cancellation**: Our proprietary ANC technology uses four microphones to detect and eliminate up to 99.8% of external noise, creating your own peaceful sanctuary anywhere.

- **Studio-Quality Sound**: Custom-engineered 40mm titanium drivers deliver rich, detailed audio with deep bass, crystal-clear mids, and pristine highs that reveal nuances in your music you've never heard before.

- **All-Day Comfort**: Memory foam ear cushions wrapped in premium protein leather conform to your ears, while the lightweight yet durable frame ensures comfort during extended listening sessions.

- **Impressive Battery Life**: Enjoy up to 40 hours of playback with ANC enabled on a single charge, with quick-charge technology providing 5 hours of use from just 10 minutes of charging.

- **Intuitive Touch Controls**: Easily manage volume, tracks, calls, and voice assistants with simple touch gestures on the ear cup.

## Perfect For

- Business professionals working in noisy environments
- Frequent travelers seeking escape from airplane noise
- Audiophiles who demand premium sound quality
- Remote workers needing focus in distracting settings

## Technical Specifications

- Bluetooth 5.2 with multipoint connection
- USB-C fast charging
- Foldable design with premium carrying case
- Voice assistant compatibility (Siri, Google Assistant, Alexa)
- Available in Midnight Black, Platinum Silver, and Navy Blue

Experience sound the way it was meant to be heard. UltraFocus – Immerse yourself in what matters.`
}

function getEmailNewsletterSample(): string {
  return `Subject: Transform Your Content Strategy with AI - Special Invitation Inside

---

# Transform Your Content Strategy with AI

![Header Image]

Dear [First Name],

In today's fast-paced digital landscape, creating consistent, high-quality content across multiple channels can feel overwhelming. That's why I'm excited to share some game-changing resources with you this month.

## What's New in AI Content Creation

Our team has been researching the latest developments in AI-assisted content creation, and the results are impressive. New tools are emerging that can help you:

- Generate first drafts in seconds rather than hours
- Repurpose existing content for different platforms automatically
- Create personalized content variations for different audience segments
- Optimize your content for search engines while maintaining readability

## Exclusive Workshop Invitation

**Join us on June 15th at 1:00 PM EST** for our exclusive workshop: "AI-Powered Content Creation: Work Smarter, Not Harder."

In this 60-minute session, you'll learn:

- How to use AI tools to enhance (not replace) your creative process
- A framework for maintaining your authentic voice while leveraging AI
- Practical workflows that can save you 10+ hours per week
- Ethical considerations and best practices for AI-assisted content

[RESERVE YOUR SPOT]

## Resource of the Month

We've created a comprehensive guide comparing the top 7 AI content tools on the market, with real-world examples and ROI calculations for businesses of different sizes.

[DOWNLOAD FREE GUIDE]

## Client Success Story

"Implementing the AI workflows from your workshop helped us increase our content output by 300% while maintaining our brand voice and actually improving engagement metrics. Our team now focuses on strategy and creative direction rather than getting bogged down in production." 
- Sarah Johnson, Marketing Director at TechSolutions Inc.

---

I hope these resources help you streamline your content creation process while elevating your results.

If you have any questions or want to share your experience with AI tools, just reply to this email. I'd love to hear from you!

Best regards,

[Your Name]
Content Strategy Director

---

[Unsubscribe] | [Privacy Policy] | [Contact Us]`
}

