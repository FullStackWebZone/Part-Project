public with sharing class PartController {
    @AuraEnabled(cacheable=true)
    public static List<Part__c> getParts() {        
        return [
            SELECT Name, Part_Number__c, Part_Description__c, Status__c, Measurement__c
            FROM Part__c
            ORDER BY Name
        ];
}
}
