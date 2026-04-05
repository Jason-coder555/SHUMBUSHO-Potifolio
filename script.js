// Jason's Portfolio - script.js
// I learned JavaScript from YouTube so some of this might not be perfect!

// ============ MOBILE MENU ============
function openMenu() {
  var menu = document.getElementById('mobileMenu');
  menu.classList.add('open');
}

function closeMenu() {
  var menu = document.getElementById('mobileMenu');
  menu.classList.remove('open');
}

// ============ PROJECT FILTER ============
function filterProjects(category, clickedBtn) {
  // get all the project cards
  var cards = document.querySelectorAll('.project-card');

  // loop through and hide/show based on category
  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var cardCat = card.getAttribute('data-cat');

    if (category === 'all' || cardCat === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  }

  // update which filter button looks active
  var btns = document.querySelectorAll('.filter-btn');
  for (var j = 0; j < btns.length; j++) {
    btns[j].classList.remove('active-filter');
  }
  clickedBtn.classList.add('active-filter');
}

// same filter function but for blog cards
function filterBlog(category, clickedBtn) {
  var cards = document.querySelectorAll('.blog-card');

  for (var i = 0; i < cards.length; i++) {
    var card = cards[i];
    var cardCat = card.getAttribute('data-cat');

    if (category === 'all' || cardCat === category) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  }

  var btns = document.querySelectorAll('.filter-btn');
  for (var j = 0; j < btns.length; j++) {
    btns[j].classList.remove('active-filter');
  }
  clickedBtn.classList.add('active-filter');
}

// ============ PROJECT MODAL ============
function showModal(title, desc, imgUrl) {
  document.getElementById('modal-title').innerText = title;
  document.getElementById('modal-desc').innerText = desc;
  document.getElementById('modal-img').src = imgUrl;
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// close modal if user presses Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// ============ CONTACT FORM ============
function sendMessage() {
  // get the values from the form
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;

  // clear old errors first
  document.getElementById('name-err').innerText = '';
  document.getElementById('email-err').innerText = '';
  document.getElementById('msg-err').innerText = '';

  var isValid = true;

  if (name.trim() === '') {
    document.getElementById('name-err').innerText = 'Please enter your name';
    isValid = false;
  }

  if (email.trim() === '') {
    document.getElementById('email-err').innerText = 'Please enter your email';
    isValid = false;
  } else if (email.indexOf('@') === -1) {
    // very basic email check - just makes sure there's an @ sign
    document.getElementById('email-err').innerText = 'That email doesn\'t look right';
    isValid = false;
  }

  if (message.trim() === '') {
    document.getElementById('msg-err').innerText = 'Please write a message';
    isValid = false;
  }

  if (isValid) {
    document.getElementById('success-msg').style.display = 'block';
    // clear the form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
  }
}

// ============ AI RECOMMENDATION ============
function getRecommendation() {
  var interest = document.getElementById('interest-select').value;
  var resultBox = document.getElementById('ai-result');
  var resultText = document.getElementById('ai-result-text');

  if (interest === '') {
    alert('Please pick an interest first!');
    return;
  }

  var message = '';

  if (interest === 'frontend') {
    message = 'Based on your interest in Frontend Development — you should check out my Weather App and Quiz Game projects! Both are built with vanilla HTML, CSS and JavaScript. My CSS and JS skills are my strongest at 90% and 80%.';
  } else if (interest === 'backend') {
    message = 'For Backend / APIs — my Task Manager and Blog CMS are the best examples. They use Node.js, Express and MongoDB. I\'m still learning backend stuff but I\'m getting better every week!';
  } else if (interest === 'design') {
    message = 'If you\'re into UI/UX Design — the E-Commerce UI and Portfolio Design projects are for you. I designed both in Figma. I\'m 75% confident in Figma and I care a lot about making things look clean and easy to use.';
  } else if (interest === 'mobile') {
    message = 'All of my projects are fully responsive and work on phones and tablets. I always build mobile-first. The Weather App and Task Manager are good examples of this.';
  } else if (interest === 'performance') {
    message = 'I improved page load speed by 40% at my current job at TechNova. I know about optimizing images, writing clean JavaScript and avoiding slow code. The Task Manager project has the best performance work.';
  }

  resultText.innerText = message;
  resultBox.style.display = 'block';
}

// ============ BLOG COMMENTS ============
// This function is called on blog-post.html
function loadComments() {
  var commentsDiv = document.getElementById('comments-list');
  if (!commentsDiv) return; // not on blog post page, do nothing

  // load saved comments from localStorage
  var saved = localStorage.getItem('blog-comments');
  var comments = saved ? JSON.parse(saved) : [];

  // add default comments if there are none yet
  if (comments.length === 0) {
    comments = [
      { name: 'Alex T.', date: 'March 14, 2026', text: 'Super helpful! CSS Grid finally makes sense to me now.' },
      { name: 'Maria L.', date: 'March 15, 2026', text: 'The auto-fill trick is a game changer. Thanks Jason!' }
    ];
    localStorage.setItem('blog-comments', JSON.stringify(comments));
  }

  renderComments(comments);
}

function renderComments(comments) {
  var commentsDiv = document.getElementById('comments-list');
  var countSpan = document.getElementById('comment-count');
  commentsDiv.innerHTML = '';
  countSpan.innerText = comments.length;

  for (var i = 0; i < comments.length; i++) {
    var c = comments[i];
    var box = document.createElement('div');
    box.className = 'comment-box';
    box.innerHTML = '<strong>' + c.name + '</strong><small>' + c.date + '</small><p>' + c.text + '</p>';
    commentsDiv.appendChild(box);
  }
}

function postComment() {
  var name = document.getElementById('comment-name').value;
  var text = document.getElementById('comment-text').value;
  var err = document.getElementById('comment-err');

  err.innerText = '';

  if (name.trim() === '' || text.trim() === '') {
    err.innerText = 'Please fill in both fields!';
    return;
  }

  var saved = localStorage.getItem('blog-comments');
  var comments = saved ? JSON.parse(saved) : [];

  var today = new Date();
  var dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  comments.push({ name: name, date: dateStr, text: text });
  localStorage.setItem('blog-comments', JSON.stringify(comments));

  renderComments(comments);

  // clear the form
  document.getElementById('comment-name').value = '';
  document.getElementById('comment-text').value = '';
}

// run loadComments when page loads (only does something on blog-post.html)
loadComments();
