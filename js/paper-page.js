const paperpage = Vue.component('paperpage', {
    template: `
    <div>
        <navigation-menu activePage="none"></navigation-menu>
        <div class="blog section section-invert py-4">
            <div class="row">
                <div class="col-md-3">
                    <div class="mx-5">
                        <h4 class="card-title">{{ title }}</h4>
                        <p class="card-authors">Author: {{ authors }}</p>
                    </div> 
                </div>
                <div class="col-md-8">
                    <object class="paper-pdf" v-bind:data="'https://arweave.net/' + txid" type="application/pdf">
                        <embed v-bind:src="'https://arweave.net/' + txid" type="application/pdf" />
                    </object>
                </div>
            </div>
        </div>
    </div>
    `,
    data: function () {
        return {
            loggedIn: true,
            title: null,
            authors: null,
            owneraddr: null
        }
    },
    props: ["txid"],
    watch: {
        txid: {
            immediate: true,
            handler: async function (val, oldVal) {
                obj = await getTagsFromId(val);
                console.log(obj);
                this.title = obj["title"];
                this.authors = obj["authors"];
                this.owneraddr = obj["owner"];
            }
        }
    },
    methods: {
}
});