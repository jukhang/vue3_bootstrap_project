<script setup>

import AppHeader from '../components/Header.vue'
import AppFooter from '../components/Footer.vue'
import AppSiderbar from '../components/Siderbar.vue'

</script>

<template>
  <AppHeader />

  <div class="container">

    <!-- <div class="p-4 p-md-5 mb-4 mt-4 rounded text-body-emphasis bg-body-secondary">
      <div class="col-lg-12 px-0">
        <h1 class="">How build high-quality system with best practices.</h1>
        <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently
          about what’s most interesting in this post’s contents.</p>
        <p class="lead mb-0"><a href="#" class="text-body-emphasis fw-bold">Continue reading...</a></p>
      </div>
    </div>

    <div class="row mb-4 mt-4">
      <div class="col-md-4">
        <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div class="col p-4 d-flex flex-column position-static">
            <strong class="d-inline-block mb-2 text-primary-emphasis">World</strong>
            <h3 class="mb-0">Featured post</h3>
            <div class="mb-1 text-body-secondary">Nov 12</div>
    <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
      Continue reading
      <svg class="bi">
        <use xlink:href="#chevron-right"></use>
      </svg>
    </a>
  </div>
  <div class="col-auto d-none d-lg-block">
    <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img"
      aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
      <title>Placeholder</title>
      <rect width="199%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef"
        dy=".3em">Thumbnail</text>
    </svg>
  </div>
  </div>
  </div>
  <div class="col-md-4">
    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div class="col p-4 d-flex flex-column position-static">
        <strong class="d-inline-block mb-2 text-success-emphasis">Design</strong>
        <h3 class="mb-0">Post title</h3>
        <div class="mb-1 text-body-secondary">Nov 11</div>
        <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
          Continue reading
          <svg class="bi">
            <use xlink:href="#chevron-right"></use>
          </svg>
        </a>
      </div>
      <div class="col-auto d-none d-lg-block">
        <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img"
          aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef"
            dy=".3em">Thumbnail</text>
        </svg>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div class="col p-4 d-flex flex-column position-static">
        <strong class="d-inline-block mb-2 text-success-emphasis">Design</strong>
        <h3 class="mb-0">Post title</h3>
        <div class="mb-1 text-body-secondary">Nov 11</div>
        <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
          Continue reading
          <svg class="bi">
            <use xlink:href="#chevron-right"></use>
          </svg>
        </a>
      </div>
      <div class="col-auto d-none d-lg-block">
        <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img"
          aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
          <title>Placeholder</title>
          <rect width="100%" height="100%" fill="#55595c"></rect><text x="50%" y="50%" fill="#eceeef"
            dy=".3em">Thumbnail</text>
        </svg>
      </div>
    </div>
  </div>
  </div> -->

    <div class="row g-5">
      <div class="col-md-8">
        <!-- <h3 class="pb-4 mb-4 border-bottom">
          From the Firehose
        </h3> -->

        <article class="blog-post border-bottom">
          <h2 class="display-5 link-body-emphasis mb-3 mt-3">
            <router-link to="/post/article" class="text-decoration-none">Sample blog post</router-link>
            <!-- <a href="/post/article" class="text-decoration-none">Sample blog post</a> -->
          </h2>
          <p class="blog-post-meta">January 1, 2021 by <a href="#">Mark</a></p>

          <p>This blog post shows a few different types of content that’s supported and styled with Bootstrap. Basic
            typography, lists, tables, images, code, and more are all supported as expected.</p>
          <p>This is some additional paragraph placeholder content. It has been written to fill the available space and
            show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the
            demonstration flowing, so be on the lookout for this exact same string of text.</p>
        </article>

        <article class="blog-post border-bottom">
          <h2 class="display-5 link-body-emphasis mb-3 mt-3">
            <router-link to="/post/article" class="text-decoration-none">Another blog post</router-link>
            <!-- <a href="/post/article" class="text-decoration-none">Another blog post</a> -->
          </h2>
          <p class="blog-post-meta">December 23, 2020 by <a href="#">Jacob</a></p>

          <p>This is some additional paragraph placeholder content. It has been written to fill the available space and
            show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the
            demonstration flowing, so be on the lookout for this exact same string of text.</p>
          <blockquote>
            <p>Longer quote goes here, maybe with some <strong>emphasized text</strong> in the middle of it.</p>
          </blockquote>
          <p>This is some additional paragraph placeholder content. It has been written to fill the available space and
            show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the
            demonstration flowing, so be on the lookout for this exact same string of text.</p>
          <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly
            repetitive body text used throughout.</p>
        </article>
        <article class="blog-post border-bottom">
          <h2 class="display-5 link-body-emphasis mb-3 mt-3">
            <router-link to="/post/article" class="text-decoration-none">New feature</router-link>
            <!-- <a href="/post/article" class="text-decoration-none">New feature</a> -->
          </h2>
          <p class="blog-post-meta">December 14, 2020 by <a href="#">Chris</a></p>
          <p>This is some additional paragraph placeholder content. It has been written to fill the available space and
            show how a longer snippet of text affects the surrounding content. We'll repeat it often to keep the
            demonstration flowing, so be on the lookout for this exact same string of text.</p>
          <p>This is some additional paragraph placeholder content. It's a slightly shorter version of the other highly
            repetitive body text used throughout.</p>
        </article>

        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center mt-3">
            <li class="page-item disabled">
              <a class="page-link">Previous</a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>

      </div>

      <div class="col-md-4">
        <div class="position-sticky" style="top: 2rem;">
          <div class="p-4 mb-3 bg-body-tertiary rounded">
            <h4 class="">About</h4>
            <p class="mb-0">Customize this section to tell your visitors a little bit about your publication, writers,
              content, or something else entirely. Totally up to you.</p>
          </div>

          <div class="p-4 mb-3 bg-body-tertiary rounded">
            <!-- <h4 class="fst-italic">Elsewhere</h4> -->
            <ol class="list-unstyled mb-0">
              <button type="button" class="btn btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter"
                  viewBox="0 0 16 16">
                  <path
                    d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334q.002-.211-.006-.422A6.7 6.7 0 0 0 16 3.542a6.7 6.7 0 0 1-1.889.518 3.3 3.3 0 0 0 1.447-1.817 6.5 6.5 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.32 9.32 0 0 1-6.767-3.429 3.29 3.29 0 0 0 1.018 4.382A3.3 3.3 0 0 1 .64 6.575v.045a3.29 3.29 0 0 0 2.632 3.218 3.2 3.2 0 0 1-.865.115 3 3 0 0 1-.614-.057 3.28 3.28 0 0 0 3.067 2.277A6.6 6.6 0 0 1 .78 13.58a6 6 0 0 1-.78-.045A9.34 9.34 0 0 0 5.026 15">
                  </path>
                </svg>
              </button>
              <!-- <li><a href="#">GitHub</a></li>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li> -->
            </ol>
          </div>

          <div class="p-4 mb-3 bg-body-tertiary rounded">
            <h4 class="">Recent posts</h4>
            <ul class="list-unstyled mb-0">
              <li>
                <a class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-1 link-body-emphasis text-decoration-none"
                  href="#">
                  <h6 class="mb-0">Example blog post title</h6>
                </a>
              </li>
              <li>
                <a class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-1 link-body-emphasis text-decoration-none"
                  href="#">
                  <h6 class="mb-0">This is another blog post title</h6>
                </a>
              </li>
              <li>
                <a class="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-1 link-body-emphasis text-decoration-none"
                  href="#">
                  <h6 class="mb-0">Longer blog post title: This one has multiple lines!</h6>
                </a>
              </li>
            </ul>
          </div>

          <div class="p-4 mb-3 bg-body-tertiary rounded">
            <h4 class="">Archives</h4>
            <ol class="list-unstyled mb-0">
              <li><a href="#" class="text-decoration-none">March 2021</a></li>
              <li><a href="#" class="text-decoration-none">February 2021</a></li>
              <li><a href="#" class="text-decoration-none">January 2021</a></li>
              <li><a href="#" class="text-decoration-none">December 2020</a></li>
              <li><a href="#" class="text-decoration-none">November 2020</a></li>
              <li><a href="#" class="text-decoration-none">October 2020</a></li>
              <li><a href="#" class="text-decoration-none">September 2020</a></li>
              <li><a href="#" class="text-decoration-none">August 2020</a></li>
              <li><a href="#" class="text-decoration-none">July 2020</a></li>
              <li><a href="#" class="text-decoration-none">June 2020</a></li>
              <li><a href="#" class="text-decoration-none">May 2020</a></li>
              <li><a href="#" class="text-decoration-none">April 2020</a></li>
            </ol>
          </div>

        </div>
      </div>
    </div>

  </div>

  <AppFooter />

</template>

<style></style>