/**
 * Created by TengShinan on 28/9/17.
 */

/*
 Define variables
 */
var totalParagraphs = 1;

var scopeOfAssessment1 = 'This Report is prepared by Archicentre Australia â a division of ArchiAdvisory Pty Ltd â and in accordance with Australian Standard 4349.1-2007 Assessment of Buildings Part 1: Pre-purchase Inspections â Residential Buildings and any other Australian Standards and definitions cited in the Terms and Conditions.';

var scopeOfAssessment2 = 'This Report is a subjective assessment prepared by the appraising architect on a visual assessment of the condition of the reasonably accessible parts of the property and on the basis of the prevailing structural, soil and weather conditions at the time of the assessment and does not cover enquiries of councils or other authorities. It is not a certificate of compliance for the property within the requirements of any Act, regulation, ordinance or local by-law.';

var scopeOfAssessment3 = 'Prolonged periods of wet or dry weather may cause structural changes to the property as described in the Property Maintenance Guide which you can download from the link found in the body of your Report and in the Report cover letter.';

var scopeOfAssessment4 = 'This Report will not disclose defects in inaccessible areas, defects that are concealed and/or not reasonably visible, defects that may be apparent in other weather conditions or defects that have not yet arisen.';

var scopeOfAssessment5 = 'This Report is not a rigorous assessment of all building elements and does not cover all maintenance items, particularly those such as jamming doors, windows or catches, decorative finishes and hairline or slight cracks.  This is in accordance with Category 0 and 1 of Appendix C âAS 2870-2011.';

var scopeOfAssessment6 = 'This Report is not a pest inspection. Archicentre Australia recommends that a pest inspection be carried out on all properties being considered for purchase. Customers wishing to have a full pest inspection should contact Archicentre Australia to arrange a separate pest inspection. Archicentre Australiaâs Timber Pest Inspections are undertaken by highly qualified, independent and authorised inspectors.  Archicentre Australia does not sell pest control services so you can trust that you will not be recommended treatments that you do not need.';

var scopeOfAssessment7 = 'The assessment assumes that the existing use of the property will continue and the Report is prepared on that basis. As such, the assessment will not assess the fitness of the property for any other intended purpose.  We advise you to verify any proposed change in use with the relevant authorities.';

var scopeOfAssessment8 = 'If you are intending to purchase the property, and in consideration of the limitations of a visual assessment, as well as budgeting for the anticipated cost of the recommended repairs and maintenance, Archicentre Australia recommends budgeting a further 5% of the value of the property, to provide a \'safety net\' against unexpected costs that may arise over the first five years of ownership and that this be taken into account when establishing a purchase price. The amount of this safety net is a rough guide for properties generally and not specific to your property.';

var scopeOfAssessment9 = 'Where the property is a unit or apartment, associated areas may include common areas pertinent and immediately adjacent to the subject residence, for which major defects only will be noted.';

var coverPageText = 'This Property Assessment Report is a visual assessment of the conditions of the reasonably accessible areas of the property at the time of the assessment, including the subject residence and associated areas where the property is a unit or apartment.';

var whatIncU1 = 'Identification of observed building defects upon a visual assessment of the reasonably accessible parts of the property;';

var whatIncU2 = 'Assessment of defects for significance relative to the expected condition of a well maintained property of similar age and construction type;';

var whatIncU3 = 'Recommended actions for identified defects;';

var whatIncU4 = 'Recommended  professionals and/or trades who may be appropriate to undertake further investigation or carry out the recommended action;';

var whatIncU5 = 'General and specific additional advice on maintenance matters that your architect has deemed appropriate.';

var whatNotIncU1 = 'Identification of toxic mould, or asbestos related products;';

var whatNotIncU2 = 'Condition or operation of swimming pools, spas or their surroundings, rainwater or grey water tanks or treatment and similar facilities;';

var whatNotIncU3 = 'Condition, adequacy or compliance of electrical, gas and plumbing systems including roof plumbing, underground pipes or drainage systems;';

var whatNotIncU4 = 'Operation adequacy or compliance of security and communications systems, smoke detectors, building services, building automation, electrically operated doors including garage doors, plant, equipment, mechanical, gas or electrical appliances and fittings;';

var whatNotIncU5 = 'Footings below ground, soil conditions, site factors and hazards;';

var whatNotIncU6 = 'Compliance with legal, planning, regulatory including Building Code of Australia, sustainability or environmental matters including but not limited to the adequacy or safety of insulation, waterproof membranes and/or other installations, Bushfire Attack Level assessments;';

var whatNotIncU7 = 'Timber, metal or other framing sizes and adequacy.';

var defectDefinitionP1 = 'Any items of repair which are common to well maintained properties of similar age or type of construction and as described in the Property Maintenance Guide, including decorative features and finishes.';

var defectDefinitionP2 = 'A defect of sufficient magnitude where rectification has to be carried out without undue delay to avoid:';

var defectDefinitionP2a = 'unsafe conditions, posing a threat to life or serious injury; or,';

var defectDefinitionP2b = 'loss of utility whereby the defect is such that the whole of the relevant part of the property can no longer serve its intended function; or,' ;

var defectDefinitionP2c = 'further substantial deterioration of the property.';

var defectDefinitionP3 = 'A major defect in any internal or external primary load bearing component of the building which seriously affects the structural integrity of the building requiring rectification to be carried out without undue delay to avoid:';

var defectDefinitionP3a = 'unsafe conditions, posing a threat to life or serious injury; or,';

var defectDefinitionP3b = 'loss of utility, whereby the defect is such that the whole of the relevant part of the building can no longer serve its intended function; or,';

var defectDefinitionP3c = 'further substantial deterioration of the building.';

var defectDefinitionP4 = 'In the case of cracking, a serious structural defect denotes severe cracking as defined by Category 4, Appendix C â Australian Standard AS 2870-2011.';

var assessmentAccessColLeft1 = 'The architect can only assess the reasonably accessible parts of the property. It is your responsibility to ensure that any inaccessible parts of the property that can be made reasonably accessible for an assessment are made so, prior to the assessment. If parts of the property have been noted as being inaccessible during the assessment, it is important that you contact the architect and arrange for a second assessment when access to restricted areas has been made available. Inaccessible areas cannot be assessed.';

var assessmentAccessColLeft2 = 'Reasonably and Safely Accessible â Accessible areas which can be accessed by a 3.6 metre ladder or those which have at least 600mm unimpeded vertical and horizontal clearance without the removal of any fixed or unfixed furniture, fittings, stored items, cladding or lining materials, plants or soil.';

var assessmentAccessColRight1 = 'Archicentre Australia architects are unable to access areas where there is a risk of adverse disturbance or damage to the property, including the garden area. The architect will determine the extent of accessible areas at the time of the assessment.';

var assessmentAccessColRight2 = 'Workplace Health and Safety access conditions apply subject to relevant State and Territory regulations. Archicentre Australia authorised architects are unable to inspect areas higher than 3 metres above ground level unless secure ladder access is available and fall prevention devices or barriers are present.';

var assessmentAccessColRight3 = 'Reasonable Access may not be possible due to physical obstructions or conditions that may be hazardous or unsafe to the architect.';

var assessmentAccessColRight4 = 'Access restrictions will be noted where appropriate.';

var yourProAssSumText = 'This Property Assessment summary provides you with a âsnapshotâ of the items the architect considers of greatest significance for you when considering this property. Please refer to the Definitions and the complete Report for detailed information regarding visible defects and recommended actions. Please note that this summary is not the complete Report and that in the event of an apparent discrepancy the complete Report overrides the Summary information.';

var attachmentText = 'The following selected attachments are an important part of this Report. These can be downloaded from the Archicentre Australia Supplementary Documents page www.archicentreaustralia.com.au/report_downloads/ or by referring to the Report cover email for downloading instructions. If you have difficulty downloading the following ticked attachments, please contact Archicentre Australia on 1300 13 45 13 immediately.';

var generalAdviceList1 = 'This is not a pest inspection report. Archicentre Australia recommends pre-purchase and ongoing timber pest inspection in all mainland states and territories.';

var generalAdviceList2 = 'Smoke detectors must be installed in accordance with current regulations. Archicentre Australia suggests that you regularly check these to ensure proper operation.';

var generalAdviceList3 = 'Drought conditions can cause buildings to crack literally overnight. Please note the precautions advised in the referred Property Maintenance Guide and any specific recommendations made in your Report.';

var generalAdviceList4 = 'The condition of timber-framed or concrete decks and balconies deteriorates over time â annual assessments should be undertaken to verify their safety.';

var generalAdviceList5 = 'In the interests of safety, Archicentre Australia recommends all property owners should have an electrical safety assessment undertaken by a suitably qualified specialist.';

var generalAdviceList6 = 'If you are purchasing the property, Archicentre Australia recommends a review of all door and window locks and security systems, appliance and equipment at settlement.';

var generalAdviceText = 'The Assessment is limited to the nominated individual property including associated private open space. It is not the scope of this assessment to include all common or other adjacent property. Legal advice should be obtained as to the liability to contribute to the cost of repairs in respect of any common property.';

var termsAndConditionsP1 = 'Report has been prepared by Archicentre Australia â a division of ArchiAdvisory Pty Ltd â and the named architect and is supplied to you (the named customer) on the basis of and subject to the Scope of Assessment and the Terms and Conditions of the Contract and the Assessment and Archicentre Australia accepts no responsibility to other persons relying on the report.';

var termsAndConditionsP2 = 'This Report has been prepared in accordance with Australian Standard 4349.1-2007 Assessment of Buildings Part 1: Pre-purchase Inspections â Residential Buildings and to any other Australian Standards and definitions cited in the Terms and Conditions.';

var termsAndConditionsP3 = 'Please note that having provided to you an opportunity to read or hear the Scope of Assessment and the Terms and Conditions following upon you making a booking for the Property Assessment, the architect has proceeded to conduct the assessment of the property and Archicentre Australia has proceeded to supply this Report on the basis that you have accepted the Scope of Assessment and the Terms and Conditions and/or are deemed to have done so upon the architect arriving at the property.';

var termsAndConditionsP4 = 'The Report is to be read in conjunction with all other Archicentre Australia Reports issued concurrently for the property.';

var termsAndConditionsP5 = 'The Scope of Assessment and the Terms and Conditions take precedence over any oral or written representations by Archicentre Australia, to the extent of any inconsistency.';

var termsAndConditionsOL1 = 'After making the booking, the customer is deemed to have accepted these Terms and Conditions and Scope of Assessment upon the architect arriving on site.';

var termsAndConditionsOL2 = 'The Report is not a guarantee but is an opinion of the condition of the assessed property relative to the average condition of well-maintained similar properties of a similar age.';

var termsAndConditionsOL3 = 'Archicentre Australia accepts no liability with respect to work carried out by other trades, consultants or practitioners referred by Archicentre Australia. It is your responsibility to make appropriate contractual arrangements with such person.';

var termsAndConditionsOL4 = 'The Report is not a certificate of compliance for the property within the requirements of any Act, regulation, ordinance or local by-law.';

var termsAndConditionsOL5 = 'Archicentre Australia does not accept responsibility for services other than those provided in this Report.';

var termsAndConditionsOL6 = 'Archicentre Australiaâs liability shall be limited to the provision of a new assessment and report or the payment of the cost of a new assessment and report, at the election of Archicentre Australia.';

var termsAndConditionsOL7 = 'The assessment assumes that the existing use of the building will continue. The assessment will not assess the fitness of the building for any intended purpose. Any proposed change in use should be verified with the relevant authorities.';

var termsAndConditionsOL8 = 'The Property Maintenance Guide constitutes a vital part of the architectâs recommendations and failure to observe either the recommendations or the Property Maintenance Guide could lead to premature deterioration of the property.';

var termsAndConditionsOL9 = 'The Health and Safety Warnings constitutes a vital part of Archicentre Australiaâs recommendation to you. Failure to observe the provisions of the warning sheet could jeopardise the safety of the occupants.';

var termsAndConditionsOL10 = 'The Report and its appendices and attachments, as issued by Archicentre Australia, takes precedence over any oral advice or draft reports, to the extent of any inconsistencies, and only the Report and its appendices and attachments, which form a vital part of the architectâs recommendations, shall be relied upon by you.';

var termsAndConditionsOL11 = 'If you are dissatisfied with the Report you agree to promptly give Archicentre Australia written notice specifying the matters about which you are dissatisfied and allow Archicentre Australia to attempt to resolve the matters with you within 28 days of receipt by Archicentre Australia of such written notice before taking any remedial action or incurring any costs.';

var termsAndConditionsOL12 = 'Reference to Archicentre Australia in this Report and any other documentation includes, where the context permits, its agents and representatives authorised to act on its behalf.';

var termsAndConditionsOL13 = 'These Terms and Conditions are in addition to, and do not replace or remove, any rights or implied guarantees conferred by the Competition and Consumer Act 2010 or any other consumer protection legislation.';

/**
 * function to get text from input
 */
function getText(id)
{
    var myText = document.getElementById(id).value.trim();
    if (myText == '') {
        myText = ''
    }
    return myText;
}

/**
 * function to get the text content from the recommendation label
 */
function getLabelText(id)
{
    var myText = document.getElementById(id).textContent;
    if (myText == "Choices will be displayed here...")
    {
        myText = 'NA';
    }
    return myText;
}

/*
    function to get the text content from the text area for further use
    if text area is empty, replace with 'NA'
 */
function getTextArea(id)
{
    var text = document.getElementById(id).value;
    if (text.trim() == "")
    {
        text = 'NA'
    }
    return text;
}


/*
 Split the text content by /n into smaller paragraphs
 place number before the paragraphs and display on the pdf
 the number is accumulated as the paragraphs increased in the whole file, not just one text content
 Fafa
 */

function splitTextArea(text)
{
    var newParagraphs = '';
    if (text != 'NA')
    {
        var newText = text.replace(/(\r\n|\r|\n)+/g, '$1');
        var paragraphTrim = newText.trim();
        var paragraphs = paragraphTrim.split("\n");
        var length = paragraphs.length;

        for (var i = 0; i < length; i++) {
            var number = totalParagraphs + i;
            newParagraphs += number + '.' + paragraphs[i] + "\n";

        }
        totalParagraphs = totalParagraphs + paragraphs.length;

        return newParagraphs;
    }
    else
    {
        return text;
    }
}
