<script setup>

import AppHeader from '../components/Header.vue'
import AppFooter from '../components/Footer.vue'
import AppSiderbar from '../components/Siderbar.vue'

</script>

<template>

  <div class="container">

    <AppHeader />

    <div class="p-4 p-md-5 mb-4 mt-4 custom_rounded text-body-emphasis bg-body-secondary">
      <div class="col-lg-12 px-0">
        <h1 class="">How build high-quality system with best practices.</h1>
        <p class="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently
          about what’s most interesting in this post’s contents.</p>
        <p class="lead mb-0"><a href="#" class="text-body-emphasis fw-bold">Continue reading...</a></p>
      </div>
    </div>

    <div class="row mb-4 mt-4">
      <div class="col-md-4">
        <div
          class="row g-0 border custom_rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
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
        <div
          class="row g-0 border custom_rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
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
        <div
          class="row g-0 border custom_rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
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
    </div>

    <div class="row g-5">
      <div class="col-md-8">
        <!-- <h3 class="pb-4 mb-4 border-bottom">
          From the Firehose
        </h3> -->

        <article class="blog-post border-bottom">
          <h2 class="display-5 link-body-emphasis mb-3 mt-3">
            <router-link to="/post/article" class="text-decoration-none">Sample blog post</router-link>
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

      <AppSiderbar />
    </div>

    <AppFooter />
  </div>
</template>

<style>
.text-decoration-none {
  font-size: 36px !important;
  color: #000000 !important;
  font-weight: bold !important;
}
</style>