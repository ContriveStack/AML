Vue.component('UploadForm', {
    template: `
    <div class="container-fluid" style="background: #F9FAFC">
    <div class="container">
        <form class="upload-paper" @keydown.enter.capture.prevent @submit.prevent="submitForm">
            <h3>Title</h3>
            <input v-model="title" placeholder="e.g Dell Latitude E6230" required class="paper-title" type="text"/><br />
            <hr/>
            <h3>Author</h3>
			
            <input v-model="authors" placeholder="e.g Dell, Microsoft, Nike, Arweave" type="text" Class="paper-title"  required/><br/>
            <hr />
            <h3>Category</h3>
            <autocomplete
              placeholder="Enter the Category"
              @selected="selectSubject"
              :source="allSubjects">
            </autocomplete>
            <p>You selected {{subject.display}}</p>
            <hr />
            <input type="file" required ref="pdfUpload" class="btn btn-primary" accept="application/pdf"/><br />
            <div class="submit">
            <template v-if="0 <= uploadProgress && uploadProgress < 100">
            <button class="btn btn-success submit my-2">Submit</button>
            <span v-if="0 !== uploadProgress">
                Progress: <progress :value="uploadProgress" max="100"></progress>
            </span>
            </template>
            <button v-if="uploadProgress >= 100" class="btn btn-success" @click.prevent>
                Successfully uploaded! Your file will be included in the next block (may take ~10 mins). Click to go back home
            </button>
            <button v-if="uploadProgress < 0" class="btn btn-danger">
                Upload failed. Click to retry.
            </button>
            </div>
        </form>
    </div>
    </div>
    `,
    data: function () {
        return {
            title: '',
            authors: '',
            subject: { display: '' },
            allSubjects: [
                { id: 1, name: 'Software' },
                { id: 2, name: 'Computer Equipment' },
                { id: 3, name: 'Communications' },
                { id: 4, name: 'Baby Care' },
                { id: 5, name: 'Car Audio & Video' },
                { id: 6, name: 'Cell Phone' },
                { id: 7, name: 'Fitness & Sports' },
                { id: 8, name: 'Home Audio' },
                { id: 9, name: 'Household Appliances' },
                { id: 10, name: 'Kitchen Appliances' },
				{ id: 11, name: 'Laundry Appliances' },
				{ id: 12, name: 'Lawn & Garden' },
				{ id: 13, name: 'Marine Equipment' },
				{ id: 14, name: 'Musical Equipment' },
				{ id: 15, name: 'Outdoor Cooking' },
				{ id: 16, name: 'Personal Care' },
				{ id: 17, name: 'Photography' },
				{ id: 18, name: 'Portable Media' },
				{ id: 19, name: 'Power Tools' },
				{ id: 20, name: 'TV and Video' },
				{ id: 21, name: 'Video Game' },
				{ id: 22, name: 'Cryptocurrency' },
				{ id: 23, name: 'Other' },
            ],
            uploadProgress: 0
        };
    },
    computed: {
    },
    methods: {
        selectSubject: function (v) {
            this.subject = v;
        },
        submitForm: async function () {
            if (!localStorage.wallet) {
                alert("You need to Log in to perform this action");
            }
            console.log("Uploading Manual with title", this.title, "subject", this.subject.selectedObject.name, "and file", this.$refs.pdfUpload.files[0]);
            var subject = this.subject.selectedObject.name;
            var title = this.title;
            var authors = this.authors;
            var _this = this;

            const reader = new FileReader();
            reader.onload = async function () {
                const file_data = new Uint8Array(reader.result);
                
                var resp = await uploadFile(title, authors, subject, file_data);
                if (resp.status == 200) {
                    alert("successfully uploaded - it may take a few minutes to appear on the blockchain.");
                } else {
                    alert("Upload unsuccessful. please try again");
                }
                location.reload();
                this.uploadProgress = 101;/*  */

            }
            reader.readAsArrayBuffer(this.$refs.pdfUpload.files[0]);

        }
    },
    components: {
        Autocomplete: window["vuejs-autocomplete"]
    }
});