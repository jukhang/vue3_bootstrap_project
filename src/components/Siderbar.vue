<script setup>
defineOptions({
    name: 'AppSiderbar'
});
</script>

<template>
    <div class="col-md-4">
        <div class="position-sticky " style="top: 2rem;">
            <div class="p-4 mb-3 bg-body-tertiary sidebar-section">
                <h4 class="">About</h4>
                <p class="mb-0">Customize this section to tell your visitors a little bit about your publication,
                    writers,
                    content, or something else entirely. Totally up to you.</p>
            </div>

            <div class="p-4 mb-3 bg-body-tertiary sidebar-section ">
                <!-- <h4 class="fst-italic">Elsewhere</h4> -->
                <ol class="list-unstyled mb-0">
                    <button type="button" class="btn btn-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-twitter" viewBox="0 0 16 16">
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

            <div class="p-4 mb-3 bg-body-tertiary sidebar-section ">
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

            <div class="p-4 mb-3 bg-body-tertiary sidebar-section ">
                <h4 class="">Archives</h4>
                <ol class="list-unstyled mb-0">
                    <li><a href="#" class="archive-list">2024</a></li>
                    <li><a href="#" class="archive-list">2023</a></li>
                    <li><a href="#" class="archive-list">2022</a></li>
                    <li><a href="#" class="archive-list">2021</a></li>
                    <li><a href="#" class="archive-list">2020</a></li>
                </ol>
            </div>

        </div>
    </div>
</template>

<style scoped>
.sidebar-section {
    background-color: #ecf8f6 !important;
    border-radius: 15px !important;
}

.archive-list {
    color: black;
    text-decoration: none;
    font-family: monospace;
    font-variant-numeric: tabular-nums;
}
</style>