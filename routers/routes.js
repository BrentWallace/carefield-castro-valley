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
    albums: [
      {
        title: '',
        target: 'carefield-castro-valley-community-photos',
        description: '',
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
      },
    ],
  });
});

router.get('/photos/activities', (req, res) => {
  res.render('photos.hbs', {
    title: 'Activities Photo Galleries',
    albums: [
      {
        title: 'Residents Communicating with their Loved Ones',
        target: 'loved-ones',
        description: '',
        photos: [
          { src: '/img/activities/CVwindow.jpg', alt: '' },
          { src: '/img/activities/CVEaster2.jpg', alt: '' },
        ],
      },
      {
        title: 'Holiday Celebrations',
        target: 'holiday-celebrations',
        description: '',
        photos: [
          { src: '/img/activities/holiday/CVHoliday1.jpg', alt: '' },
          { src: '/img/activities/holiday/CVHoliday2.jpg', alt: '' },
          { src: '/img/activities/holiday/CVHoliday3.jpg', alt: '' },
          { src: '/img/activities/holiday/CVHoliday4.jpg', alt: '' },
        ],
      },
    ],
  });
});

router.get('/photos/dining', (req, res) => {
  res.render('photos.hbs', {
    title: 'Dining Photo Gallery',
    albums: [
      {
        title: 'Carefield Castro Valley Dining Photos',
        target: 'carefield-castro-valley-dining-photos',
        photos: [
          { src: '/img/dining/CVEaster8.jpg' },
        ],
      },
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

router.get('/testimonials', (req, res) => {
  res.render('testimonials.hbs', {
    title: 'Family Testimonials',
    yelpReviews: [
      {
        name: 'Jonathan D.',
        photo: '/img/yelp/jonathan-d.jpg',
        text: 'Kathy the RN at the facility is great . Really responsive, caring , and does what\'s in the best of the patients and families. I\'ve witnessed Kathy make a impact with staff creating bonds which fosters great teamwork in the community .',
        link: 'https://www.yelp.com/biz/carefield-castro-valley-assisted-living-and-memory-care-castro-valley-4?hrid=Ta8JyUErABSl7nBjB7vizg&utm_campaign=www_review_share_popup&utm_medium=copy_link&utm_source=(direct)',
      },
      {
        name: 'Erick C.',
        photo: '',
        text: 'Finding the right place for my grandpa was not easy but ever since we met Parveen Singh I knew this was the right place for him. From answering all our questions to making the transition smooth, Parveen went above and beyond. The Castro Valley location is clean and nice and after meeting her there\'s no doubt in my mind now that we picked the right place.',
        link: 'https://www.yelp.com/biz/carefield-castro-valley-assisted-living-and-memory-care-castro-valley-4?hrid=7C2k2lg0dVQ3As6e_hqwXw&utm_campaign=www_review_share_popup&utm_medium=copy_link&utm_source=(direct)',
      },
      {
        name: 'Darrah J.',
        photo: '/img/yelp/darrah-j.jpg',
        text: 'Both my grandmothers were residents at "The Villa" in Castro Valley. Over the years, our family has witnessed The Villa go through many changes, and through ups and downs. The Villa is currently under the leadership of Parveen Singh, who has completely turned around the management and made The Villa a safe, wonderful, engaging place for the residents who live there and their families. The facility is clean and the residents are cared for appropriately. Parveen, as well as the lead RN Kathy, are incredible professionals who have improved The Villa to become the best I\'ve seen it in over a decade. They are wonderful leaders in The Villa community and I am forever appreciative of them making my grandmother\'s last days as comfortable as possible. There are so many names that I am so grateful for. Parveen and Kathy, also Christie, MaryKay, Doreen, the list goes on. They provided, and continue to provide, compassionate, respectful care to her and to my family and I am forever grateful. I would not have recommended The Villa a few years ago, but with these improvements and changes in leadership and management, I would absolutely recommend The Villa now. Thank you all at The Villa.',
        link: 'https://www.yelp.com/biz/carefield-castro-valley-assisted-living-and-memory-care-castro-valley-4?hrid=PiJLwP7syGGkCmBLbNGarg&utm_campaign=www_review_share_popup&utm_medium=copy_link&utm_source=(direct)',
      },
      {
        name: 'CJ G.',
        photo: '',
        text: 'My experience with The Villa has been fantastic. (My understanding is that The Villa has been under new management for 9 months and really is not the same as "Eden Villa," which is what many of these reviews are about.) I checked out four Assisted Living and Memory Care facilities in Castro Valley, San Leandro, and Oakland and this one was my favorite. The new executive director, Parveen, is excellent. She understands the complex line to walk between keeping elders (particularly those with MCI or dementia) safe, while maintaining their dignity. As I toured the place, Parveen said hello to each staff member and resident by name. The staff members introduced themselves to me as we walked by. It was a warm culture that I think is difficult to fake. Christie, at the front desk, was also kind. One morning, on thirty minutes\' notice, they managed to re-arrange schedules so that Parveen could give me and my mom a "tour" via video chat to help my mom make her decision about where to move. My mom decided not to move to CA, but if she had, or if she does in the future, this is where we\'ll go.',
        link: 'https://www.yelp.com/biz/carefield-castro-valley-assisted-living-and-memory-care-castro-valley-4?hrid=aT0DKmF6ovfPeC-RobvbOg&utm_campaign=www_review_share_popup&utm_medium=copy_link&utm_source=(direct)',
      },
    ],
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
