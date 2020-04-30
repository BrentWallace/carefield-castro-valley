const express = require('express');
const sgMail = require('@sendgrid/mail');
const { check, validationResult } = require('express-validator');

const router = new express.Router();

router.get('/', (req, res) => {
  res.render('index.hbs', {
    title: 'Carefield Castro Valley Assisted Living & Memory Care',
    description: 'Welcome to Carefield Castro Valley, an assisted living and memory care senior living community in Castro Valley, California. Carefield Castro Valley offers an engaging and varied lifestyle that empowers individuals to enjoy creative pursuits, refine skills, revisit old hobbies, and discover new passions in a family environment.',
    jsonld: `{
      "@context": "https://schema.org",
      "@type": "localBusiness",
      "image": "https://carefieldcastrovalley.com/img/hero-slide-1.jpg",
      "logo":"https://carefieldcastrovalley.com/img/carefield-castro-valley-logo.png",
      "address": {
        "@type": "postalAddress",
        "addressLocality": "Castro Valley",
        "addressRegion": "CA",
        "postalCode": "94546",
        "streetAddress": "19960 Santa Maria Ave."
      },
      "name": "Carefield Castro Valley",
      "url": "https://carefieldcastrovalley.com",
      "telephone": "+15105822765",
      "sameAs": ["https://www.facebook.com/carefieldcastrovalley/"]
    }`,
  });
});

router.get('/about', (req, res) => {
  res.render('about.hbs', {
    title: 'About Carefield Castro Valley',
  });
});

router.get('/photos', (req, res) => {
  res.render('photos.hbs', {
    title: 'Community Photo Gallery',
    photos: [
      { src: '/img/gallery/cv-gallery-0.jpg' },
      { src: '/img/gallery/cv-gallery-1.jpg' },
      { src: '/img/gallery/cv-gallery-2.jpg' },
      { src: '/img/gallery/cv-gallery-3.jpg' },
      { src: '/img/gallery/cv-gallery-4.jpg' },
      { src: '/img/gallery/cv-gallery-5.jpg' },
      { src: '/img/gallery/cv-gallery-6.jpg' },
      { src: '/img/gallery/cv-gallery-7.jpg' },
    ],
  });
});

router.get('/photos/activities', (req, res) => {
  res.render('photos.hbs', {
    title: 'Activities Photo Gallery',
    photos: [
      { src: '/img/activities/EasterCV.jpg' },
      { src: '/img/activities/CVEaster2.jpg' },
      { src: '/img/activities/CVwindow.jpg' },
    ],
  });
});

router.get('/photos/dining', (req, res) => {
  res.render('photos.hbs', {
    title: 'Dining Photo Gallery',
    photos: [
      { src: '/img/dining/CVEaster8.jpg' },
    ],
  });
});

router.get('/videos', (req, res) => {
  res.render('videos.hbs', {
    title: 'Videos',
  });
});

router.get('/floor-plans', (req, res) => {
  res.render('floor-plans.hbs', {
    title: 'Floorplans',
  });
});

router.get('/assisted-living', (req, res) => {
  res.render('assisted-living.hbs', {
    title: 'Assisted Living',
  });
});

router.get('/memory-care', (req, res) => {
  res.render('memory-care.hbs', {
    title: 'Memory Care',
  });
});

router.get('/activities', (req, res) => {
  res.render('activities.hbs', {
    title: 'Events & Activities',
  });
});

router.get('/covid-19', (req, res) => {
  res.render('covid.hbs', {
    title: 'COVID-19',
  });
});

router.get('/sitemap.xml', (req, res) => {
  const file = `${__dirname}/../public/sitemaps/sitemap.xml`;
  res.download(file);
});

router.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nAllow: /*\nSitemap: https://carefieldcastrovalley.com/sitemap.xml')
});

router.get('/contact', (req, res) => {
  res.render('contact.hbs', {
    title: 'Contact Us',
  });
});

router.post('/contact', [
  check('fromEmail').isEmail().normalizeEmail(),
  check('firstName').trim().escape(),
  check('lastName').trim().escape().notEmpty(),
  check('phone').isMobilePhone('en-US'),
  check('referralSource').trim().escape(),
  check('inquiringFor').trim().escape(),
  check('brochure').trim().escape(),
  check('tour').trim().escape(),
  check('comments').trim().escape(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send();
  }
  const toEmail = process.env.EMAIL_RECIPIENT.split(',');
  const {
    fromEmail,
    firstName,
    lastName,
    phone,
    referralSource,
    inquiringFor,
    brochure,
    tour,
    comments,
  } = req.body;
  const msg = {
    to: toEmail,
    from: fromEmail,
    subject: `Carefield Castro Valley Contact Form: ${firstName} ${lastName} - ${fromEmail}`,
    text: `${firstName} ${lastName} has submitted an inquiry through the contact form on carefieldcastrovalley.com. They can be contacted by phone at ${phone} and by email at ${fromEmail}.\r\nInquiring for:${inquiringFor}\r\nReferred by: ${referralSource}\r\nBrochure:${brochure}\r\nTour:${tour}\r\n\r\nMessage start: ${comments}`,
    html: `
      <h1>New Contact Form Submission</h1>
        <p><strong>${firstName} ${lastName}</strong> has submitted an inquiry through the contact form on carefieldcastrovalley.com.</p>
        <h2>Contact Details</h2>
        <ul>
          <li>Email: ${fromEmail}</li>
          <li>Phone: ${phone}</li>
          <li>Referred by: ${referralSource}</li>
          <li>Inquiring for: ${inquiringFor}</li>
          <li>Brochure: ${brochure}</li>
          <li>Tour: ${tour}</li>
        </ul>
        <h2>Message Start:</h2>
        <p>${comments}</p>
        `,
  };
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  sgMail.send(msg);
  return res.send('Thank you for your inquiry! Our Community Relations Director will reach out to you shortly.');
});

module.exports = router;
