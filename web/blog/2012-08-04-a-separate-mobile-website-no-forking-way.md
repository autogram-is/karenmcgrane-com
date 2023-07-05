---
id: 258
title: A Separate Mobile Website? No Forking Way!
slug: a-separate-mobile-website-no-forking-way
excerpt: >-
  The danger with an m-dot site is that you'll fork your content into separate
  desktop and mobile versions. To deliver on the promise of adaptive content,
  you need a CMS that will help you manage and maintain content variations.
tags:
  - m-dot-sites
  - by-karen
  - republished
source: 257
---
The experience of using a mobile website should naturally be different from a desktop experience – not just visual presentation, content should be prioritised and structured differently. The risk, though, is that you’ll wind up maintaining different versions. News flash: this will be a disaster. Duplicate content. Out-of-sync updates. Wasted effort.


When usability pioneer Jakob Nielsen argued that you should “Build a separate mobile-optimised site (or mobile site) if you can afford it” where you cut features and content “that are not core to the mobile use case", many within the mobile design and development community got out their torches and pitchforks. Seems like people who spend a lot of time thinking about mobile agree that a separate mobile website is “180-degrees backward”.
<h3>But what does a “separate mobile website” even mean?</h3>
Whether you’re talking about content or code, what you want to guard against is creating multiple versions of your website. It’s called forking, and it’s a forking nightmare from a maintenance perspective. If you fork your website into separate mobile and desktop versions, then you’re stuck updating both of them every time there’s a change. Avoiding this problem is tricky, even with sophisticated content management systems. But before we get there, let’s start with a simple scenario.
<h3>Manage content like it’s 1999</h3>
Imagine you have a static website that you created back in the late 90s. There’s no CMS, so all the content is hard-coded into your HTML.

You decide that you want to join the 21st century by creating a mobile website. Good for you! Except for the nightmare part, which is that you’ll essentially be creating a totally separate website, and now you’ll have to update both versions every time there’s a change. You’ll need to code two completely different sets of pages: unique templates for both desktop and mobile. And even if – especially if – you want to publish exactly the same content to both versions, you’ll have to maintain two separate versions of the content too. Double your workload, double your fun?
<h3>Cut features! Cut content!</h3>
Great! You might think. Maybe creating distinct content is actually an advantage! A separate mobile website will still be aces if I don’t want to publish exactly the same information. I’ll cut features, cut content, and re-prioritise what I want to say. I’ll publish a mobile website that only shows a subset of my content, targeted specifically at the needs of the mobile user.

Let’s set aside for a moment the argument about whether or not that’s the right user experience. (It’s not.)

From a maintenance perspective, you’re still forking your content. Want to add a new page? Edit a description? Fix a typo? You’ll be doing it twice.
<h3>But that’s why I have a CMS</h3>
The whole point of having a content management system is to help streamline the publishing workflow, right? So of course, you just assume that your current CMS will make it easy to publish content to different channels and platforms.

Jakob Nielsen makes this assumption when asked about the dangers of forking your content:

“I would assume that most industrial-scale sites would be generated from a single backend product database and content management system, with the different designs represented by templates and rules about what information goes into what version.”

Unfortunately, today, many CMSes just don’t support this type of multi-channel publishing. Ask your CMS to display similar-but-not-the-same content in different templates according to a set of business rules, and it’ll start spewing out yards of dot-matrix printer paper, beeping that it “does not compute.”
<h3>You have a WEB CMS</h3>
Most CMSes are designed to publish to one and only one platform: the desktop web. In a Web CMS (WCMS), content authoring and management functions are “coupled” with content publishing and display functions. (If you have a large-scale enterprise CMS, it’s likely “de-coupled” and this point may not apply to you.)

Most websites simply don't have a content management backend that will support populating different design templates with different content. Content assets (like text fields, images, and supporting files or media) are usually locked to a specific output format or design. That wasn’t a problem until now, because no one expected the WCMS to have to support publishing to different channels – the desktop web was all there was.

The fact that the WCMS works this way is no mere “implementation detail.” Unfortunately, it’s fundamental to the way content is published on the web today. We’ve got to fix this if we’re going to deliver optimised experiences on desktop and mobile.
<h3>Multi-site management</h3>
Now, some CMSes do, in fact, support publishing content to multiple templates. It’s called multi-site management, and it’s what allows a WordPress blog or a Drupal site to have separate templates for desktop and mobile content display. Note that says “separate templates”– not separate content. These CMSes still like to publish the same content on both sites. (Specifically, they’re happy when publishing the same “body” or “node” content one-to-one across desktop and mobile. Other content elements, like sidebars or user comments, are often stored in a different location and may be stripped out.)

What these CMSes don’t do (at least not without putting significant effort into it) is support publishing different content to different templates according to a set of business rules. So if your plan is to deliver less content to your mobile user, chances are your CMS isn’t going to make that easy on you. You’re still going to have to maintain two versions of that content, and update them separately whenever there’s a change.

In other words, you’re forked.
<h3>Responsive design to the rescue!</h3>
Responsive design is often held up as a solution that saves you from having to maintain multiple separate codebases for your front-end code. Put the effort in to developing one set of code that will adapt to different screen sizes and progressively enhance for different device capabilities, and you’ll save time in the long run. You’ll also get out of the arms race of having to support dozens of different devices and form factors.

Responsive design is also an approach that saves you from forking your content. If you have a coupled CMS that can only handle publishing to one set of templates, then you can trick your CMS into publishing to different devices by handling the conversion to mobile or tablet sizes on the frontend.

The decision about whether to develop a responsively designed site or to maintain different templates for desktop, phone, and everything in-between is a pragmatic choice based on how you want to allocate time and resources for development and maintenance. There are good reasons for both approaches – often rooted in the specifics of how your CMS functions – and what works for one organisation may not work for another.

Let’s not get distracted by this debate and lose sight of the fundamental issue, which is how we evolve our content management tools and processes to effectively support multi-channel publishing.
<h3>Content mismanagement is the real problem</h3>
The hype and the debates around responsive design are missing the real problem. The challenge for most organisations in the long run won’t be maintaining multiple sets of frontend code for different templates. It will be maintaining variations of duplicate content.

Any arguments about whether to deliver less content or different content to the mobile user need to take into account the level of effort that will be required to manage and maintain that content. If you’re going around suggesting that it’s okay to cut information provided to mobile users, be aware that this approach may doom you to duplicate content and governance headaches. Paying attention to this is the very essence of content strategy.
<h3>Content strategy for mobile</h3>
To provide a great experience on mobile – one that delivers the information users want, and can be maintained internally – we need a content strategy for mobile.
<ul>
	<li>Quit thinking you can just guess what subset of content a “mobile user” wants. You’re going to guess wrong.</li>
	<li>While you're at it, quit thinking your current mobile analytics will help you make the right decision. Today’s crummy, crippled mobile experiences are inadequate environments for evaluating what people really want to do on mobile.</li>
	<li>Focus on getting all of your desktop content into a format where it can be comfortably viewed on mobile devices, whether by creating a new set of templates for mobile, a responsively designed site, or some combination of the two (say, keeping your current desktop site and building responsive templates to cover the range of phones and tablets.)</li>
	<li>Once you have all your content on mobile, gradually figure out how to prioritise information differently. For example, your homepage for mobile might be different from your desktop homepage. But base that on real data about how people are using your full set of content on mobile – don’t just assume you know best.</li>
	<li>If you discover that some of your content just isn’t useful to anyone – it’s outdated, badly-written, or irrelevant – then take this opportunity to clean it up. Desktop users will benefit too!</li>
	<li>Fix your CMS. If you’re imagining a future where you can publish different content to mobile vs desktop, you’ve got work to do to make sure your tools, processes, and workflow will support that.</li>
</ul>
