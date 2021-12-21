import { LightningElement, api, wire, track } from 'lwc';
import PARTNUMBER from '@salesforce/schema/Part__c.Part_Number__c';
import PARTNAME from '@salesforce/schema/Part__c.Name';
import PARTDESCRIPTION from '@salesforce/schema/Part__c.Part_Description__c';
import MEASUREMENT from '@salesforce/schema/Part__c.Measurement__c';
import STATUS from '@salesforce/schema/Part__c.Status__c';
// import UNITOFMEASURE from '@salesforce/schema/Part_c.Unit_of_Measure__c';
import getParts from '@salesforce/apex/PartController.getParts';

const COLUMNS = [
    { label: 'Part Name', fieldName: PARTNAME.fieldApiName, type: 'text' },
    { label: 'Part Number', fieldName: PARTNUMBER.fieldApiName, type: 'text' },
    { label: 'Part Description', fieldName: PARTDESCRIPTION.fieldApiName, type: 'text' },
    { label: 'Measurement', fieldName: MEASUREMENT.fieldApiName, type: 'text' },
    { label: 'Status', fieldName: STATUS.fieldApiName, type: 'text' },
    // { label: 'Unit of Measure', fieldName: UNITOFMEASURE.fieldApiName, type: 'text' },

];

export default class Category extends LightningElement {
    columns = COLUMNS;
    @wire(getParts)
    parts;

    @track newpart = false;
    @track newcategory = false;
    hideCategoryPopup() {
        this.newcategory = false;
    }
    ShowCategoryPopup() {
        this.newcategory = true;
    }

    hidePartPopup() {
        this.newpart = false;
    }
    showPartPopup() {
        this.newpart = true;
    }

    handleSuccess(event) {
        if (event == true) {}
    }
    category_save(event) {
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            element.reportValidity();
        });
        let isError = this.template.querySelector(".slds-has-error");
        if (!isError) {
            this.template.querySelector("lightning-record-edit-form").submit();
            this.handleSuccess(true);
            this.newcategory = false;
        } else {
            this.handleSuccess(false);
        }
    }
    handlesavePart(event) {
        this.template.querySelectorAll('lightning-input-field').forEach(element => {
            element.reportValidity();
        });
        let isError = this.template.querySelector(".slds-has-error");
        if (!isError) {
            this.template.querySelector("lightning-record-edit-form").submit();
            this.handleSuccess(true);
            this.newpart = false;
        } else {
            this.handleSuccess(false);
        }
    }


    @api recordId;
    fileData
    openfileUpload(event) {
        const file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': this.recordId
            }
            console.log(this.fileData)
        }
        reader.readAsDataURL(file)
    }

    toast(title) {
        const toastEvent = new showToastEvent({
            title,
            varient: "successful"
        })
        this.dispatchEvent(toastEvent)
    }
    items = [{
        label: 'Metal',
        name: '1',
        expanded: true,
        items: [{
                label: 'Bolts',
                name: '2',
                expanded: true,
                items: [],
            },
            {
                label: 'Nuts',
                name: '3',
                expanded: true,
                items: [],
            },
            {
                label: 'Screws',
                name: '4',
                expanded: true,
            },
        ],
    }, ]
}