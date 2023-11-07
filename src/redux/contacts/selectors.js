export const selectContacts = state => state.contactList.contacts.items;
export const selectIsLoading = state => state.contactList.contacts.isLoading;
export const selectError = state => state.contactList.contacts.error;
export const selectCurrentID = state => state.contactList.contacts.deletedId;
