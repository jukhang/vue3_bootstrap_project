<script setup>
defineOptions({
    name: 'AppComment'
});
import { ref, onMounted } from 'vue'

const textArea = ref(null)

const adjustHeight = () => {
    const element = textArea.value
    element.style.height = 'auto' // 重置高度
    element.style.height = `${element.scrollHeight}px` // 根据内容调整高度
}

// 设置默认高度
onMounted(() => {
    textArea.value.style.height = `${textArea.value.scrollHeight}px`
})
</script>

<template>
    <div class="border-top py-3 border-bottom">
        <!--comment-->
        <div class="">
            <div class="card-header pt-3">
                <h3>最新评论</h3>
            </div>
            <div class="card-body pb-3 m-3">
                <div class="row">
                    <div class="col">
                        <div class="d-flex flex-start mt-4">
                            <img class="rounded-circle shadow-1-strong me-3"
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar"
                                width="48" height="48" />
                            <div class="flex-grow-1 flex-shrink-1">
                                <div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p class="mb-1">
                                            Maria Smantha <span class="small">· 2
                                                hours ago · </span>
                                            <a href="#!">
                                                <span class="small">#reply</span>
                                            </a>
                                        </p>
                                    </div>
                                    <p class="small mb-0">
                                        It is a long established fact that a reader
                                        will be distracted by
                                        the readable content of a page.
                                    </p>
                                </div>

                                <div class="d-flex flex-start mt-4">
                                    <a class="me-3" href="#">
                                        <img class="rounded-circle shadow-1-strong"
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp"
                                            alt="avatar" width="48" height="48" />
                                    </a>
                                    <div class="flex-grow-1 flex-shrink-1">
                                        <div>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <p class="mb-1">
                                                    Simona Disa <span class="small">· 3 hours
                                                        ago · </span>
                                                    <a href="#!">
                                                        <span class="small">#reply</span>
                                                    </a>
                                                </p>
                                            </div>
                                            <p class="small mb-0">
                                                letters, as opposed to using
                                                'Content here, content here',
                                                making it look like readable
                                                English.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex flex-start mt-4">
                                    <a class="me-3" href="#">
                                        <img class="rounded-circle shadow-1-strong"
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                                            alt="avatar" width="48" height="48" />
                                    </a>
                                    <div class="flex-grow-1 flex-shrink-1">
                                        <div>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <p class="mb-1">
                                                    John Smith <span class="small">·
                                                        4 hours ago · </span>
                                                    <a href="#!">
                                                        <span class="small">#reply</span>
                                                    </a>
                                                </p>
                                            </div>
                                            <p class="small mb-0">
                                                the majority have suffered
                                                alteration in some form, by
                                                injected humour, or randomised
                                                words.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex flex-start mt-4">
                            <img class="rounded-circle shadow-1-strong me-3"
                                src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(12).webp" alt="avatar"
                                width="48" height="48" />
                            <div class="flex-grow-1 flex-shrink-1">
                                <div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <p class="mb-1">
                                            Natalie Smith <span class="small">· 2
                                                hours ago · </span>
                                            <a href="#!">
                                                <span class="small">#reply</span>
                                            </a>
                                        </p>
                                    </div>
                                    <p class="small mb-0">
                                        The standard chunk of Lorem Ipsum used since
                                        the 1500s is
                                        reproduced below for those interested.
                                        Sections 1.10.32 and
                                        1.10.33.
                                    </p>
                                </div>

                                <div class="d-flex flex-start mt-4">
                                    <a class="me-3" href="#">
                                        <img class="rounded-circle shadow-1-strong"
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(31).webp"
                                            alt="avatar" width="48" height="48" />
                                    </a>
                                    <div class="flex-grow-1 flex-shrink-1">
                                        <div>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <p class="mb-1">
                                                    Lisa Cudrow <span class="small">· 4 hours
                                                        ago · </span>
                                                    <a href="#!">
                                                        <span class="small">#reply</span>
                                                    </a>
                                                </p>
                                            </div>
                                            <p class="small mb-0">
                                                Cras sit amet nibh libero, in
                                                gravida nulla. Nulla vel metus
                                                scelerisque ante sollicitudin
                                                commodo. Cras purus odio,
                                                vestibulum in vulputate at, tempus
                                                viverra turpis.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex flex-start mt-4">
                                    <a class="me-3" href="#">
                                        <img class="rounded-circle shadow-1-strong"
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(29).webp"
                                            alt="avatar" width="48" height="48" />
                                    </a>
                                    <div class="flex-grow-1 flex-shrink-1">
                                        <div>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <p class="mb-1">
                                                    Maggie McLoan <span class="small">· 5 hours
                                                        ago · </span>
                                                    <a href="#!">
                                                        <span class="small">#reply</span>
                                                    </a>
                                                </p>
                                            </div>
                                            <p class="small mb-0">
                                                a Latin professor at Hampden-Sydney
                                                College in Virginia,
                                                looked up one of the more obscure
                                                Latin words, consectetur
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div class="d-flex flex-start mt-4">
                                    <a class="me-3" href="#">
                                        <img class="rounded-circle shadow-1-strong"
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
                                            alt="avatar" width="48" height="48" />
                                    </a>
                                    <div class="flex-grow-1 flex-shrink-1">
                                        <div>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <p class="mb-1">
                                                    John Smith <span class="small">·
                                                        6 hours ago · </span>
                                                    <a href="#!">
                                                        <span class="small">#reply</span>
                                                    </a>
                                                </p>
                                            </div>
                                            <p class="small mb-0">
                                                Autem, totam debitis suscipit saepe
                                                sapiente magnam officiis
                                                quaerat necessitatibus odio
                                                assumenda, perferendis quae
                                                iusto
                                                labore laboriosam minima numquam
                                                impedit quam dolorem!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer pb-3 m-3">
                <div class="d-flex flex-start w-100">
                    <img class="rounded-circle shadow-1-strong me-3"
                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="48"
                        height="48" />
                    <div data-mdb-input-init class="form-outline w-100">
                        <textarea ref="textArea" class="form-control" id="textAreaExample" rows="4"
                            style="background: #fff; overflow: hidden; resize: none;" @input="adjustHeight"></textarea>
                        <label class="form-label" for="textAreaExample">Message</label>
                    </div>
                </div>
                <div class="float-end">
                    <button type="button" data-mdb-button-init data-mdb-ripple-init
                        class="btn btn-primary btn-sm me-3">Post
                        comment</button>
                    <button type="button" data-mdb-button-init data-mdb-ripple-init
                        class="btn btn-outline-primary btn-sm">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>