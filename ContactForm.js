import { LightningElement,track } from 'lwc';
import {createRecord} from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import CONTACT_OBJECT from '@salesforce/schema/Contact';
import CONTACT_FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import CONTACT_LAST_NAME from '@salesforce/schema/Contact.LastName';
import CONTACT_EMAIL from '@salesforce/schema/Contact.Email';
import CONTACT_MOBILE from '@salesforce/schema/Contact.Phone';

 

export default class contactForm extends LightningElement {
firstname;
lastname;
email;
mobile;

handleChange(event)
{

 this.fieldValue = event.target.value; 
 if(event.target.label === "First Name" && this.fieldValue !=='' && this.fieldValue !== undefined)
 this.firstName = this.fieldValue;
 else if(event.target.label === "Last Name" && this.fieldValue !=='' && this.fieldValue !== undefined)
 this.lastName = this.fieldValue;
 else if(event.target.label === "Email" && this.fieldValue !=='' && this.fieldValue !== undefined)
 this.email = this.fieldValue; 
 else if(event.target.label === "mobile" && this.fieldValue !=='' && this.fieldValue !== undefined)
 this.mobile = this.fieldValue; 
}



createContact()
{
 const feilds = {};
 feilds[CONTACT_FIRST_NAME.fieldApiName] = this.firstName;
 feilds[CONTACT_LAST_NAME.fieldApiName] = this.lastName;
 feilds[CONTACT_EMAIL.fieldApiName] = this.email;
 feilds[CONTACT_MOBILE.fieldApiName] = this. mobile;
 
 const contact = {apiName:CONTACT_OBJECT.objectApiName, fields: feilds};
 createRecord(contact)

 .then(contact => {
 this.contactId = contact.id; 
 this.dispatchEvent(
 new ShowToastEvent({
 title: 'Success',
 message: 'Contact succesfully created. Contact Id: '+this.contactId,
 variant: 'success',
 }),
 );
 })
 
 .catch(error => {
 this.dispatchEvent(
 new ShowToastEvent({
 title: ' error ',
 message: error.body.message,
 variant: 'error',
 }),
 );
 });
}
}