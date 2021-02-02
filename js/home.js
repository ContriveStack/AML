Vue.component('homepage', {
    template: `
    <div class="homepage">
        <navigation-menu activePage="home" :loggedIn="loggedIn"></navigation-menu>
        <div class="welcome d-flex justify-content-center flex-column" style="height: 60vh; min-height: 700px;">
        <div class="container">
            <!-- Navigation -->
            <!-- / Navigation -->
        </div> <!-- .container -->

        <!-- Inner Wrapper -->
        <div class="inner-wrapper mt-auto mb-auto container">
            <div class="row">
                <div class="col-12 mt-auto mb-auto mr-3" style="text-align: center">
                    <h1 class="welcome-heading display-4 text-white">AML | Your Ultimate Manuals Library</h1>
                    <p class="text-white">Search for Manuals on Arweave!
                    </p>
                    <form @submit.prevent="doSearch">
                    <input required class="form-control border-5 mr-20 mb-2 mr-sm-10 " type="text"
                        placeholder="Search Manual" ref="searchVal">
                    <button type="submit"
                        class="btn btn-lg btn-light .btn-squared align-self-center">
                        Search
                        </button>
                     </form>

                </div>
            </div>
        </div>
        <!-- / Inner Wrapper -->
        </div>
        <div id="recentPapers" name="recentPapers">
            <paper-viewer loadPapersFrom="recent"></paper-viewer>
        </div>
       
    </div>
    `,
    data: function () {
        return {
            loggedIn: true
        }
    },
    methods: {
        doSearch: function () {
            this.$router.push({ path: '/search/contents/' + this.$refs.searchVal.value });
        }
    }
});