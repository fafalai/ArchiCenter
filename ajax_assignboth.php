<?php
  require_once("shared.php");
//  include 'ChromePhp.php';
  global $reportTypes;
  global $userTypes;
  global $footer;
  global $header;

  function doMacros($h, $b,$propertyid)
  {
    global $reportTypes;
    global $userTypes;

    //Get the contents of the footer and header to the variables.
    $header = file_get_contents('Email_Header.html');
    $workstate = $b['state'];
    if($workstate == 'NSW')
    {
        $footer = file_get_contents('Email_Footer_NSW.html');
    }
    elseif($workstate == 'SA')
    {
      $footer = file_get_contents('Email_Footer_SA.html');
    }
    else
    {
        $footer = file_get_contents('Email_Footer.html'); 
    }
    $currentyear = date("Y");
    $footer = str_replace("XXX_YEAR",$currentyear,$footer);
    
    $h = str_replace("XXX_HEADER", $header, $h);
    $h = str_replace("XXX_FOOTER", $footer, $h);

    // $h = str_replace("XXX_ARCHITECTNAME", $b['linked_firstname'] . ' ' . $b['linked_lastname'], $h);
    // $h = str_replace("XXX_ARCHITECTPHONE", $b['linked_mobile'], $h);

    $h = str_replace("XXX_BOOKINGCODE", $propertyid, $h);
    //      ChromePhp::log($b);
    //      error_log($b);
    //    $h = str_replace("XXX_COMBOBOOKINGCODE", $b['linked_bookingcode'], $h);

    $h = str_replace("XXX_CUSTFIRSTLASTNAME", $b['custfirstname'] . ' ' . $b['custlastname'], $h);
    $h = str_replace("XXX_CUSTFIRSTNAME", $b['custfirstname'], $h);
    $h = str_replace("XXX_CUSTADDRESS1", $b['custaddress1'], $h);
    $h = str_replace("XXX_CUSTADDRESS2", $b['custaddress2'], $h);
    $h = str_replace("XXX_CUSTCITY", $b['custcity'], $h);
    $h = str_replace("XXX_CUSTSTATE", $b['custstate'], $h);
    $h = str_replace("XXX_CUSTPOSTCODE", $b['custpostcode'], $h);
    $h = str_replace("XXX_CUSTPHONE", $b['custphone'], $h);
    $h = str_replace("XXX_CUSTMOBILE", $b['custmobile'], $h);
    $h = str_replace("XXX_CUSTEMAIL", $b['custemail'], $h);
    $h = str_replace("XXX_PROPADDRESS1", $b['address1'], $h);
    $h = str_replace("XXX_PROPADDRESS2", $b['address2'], $h);
    $h = str_replace("XXX_PROPCITY", $b['city'], $h);
    $h = str_replace("XXX_PROPSTATE", $b['state'], $h);
    $h = str_replace("XXX_PROPPOSTCODE", $b['postcode'], $h);
    $h = str_replace("XXX_REPORTTYPE", $reportTypes[$b['itype']], $h);

    $h = str_replace("XXX_ESTATEAGENTCOMPANY", $b['estateagentcompany'], $h);
    $h = str_replace("XXX_ESTATEAGENTCONTACT", $b['estateagentcontact'], $h);
    $h = str_replace("XXX_ESTATEAGENTMOBILE", $b['estateagentmobile'], $h);
    $h = str_replace("XXX_ESTATEAGENTPHONE", $b['estateagentphone'], $h);
    $h = str_replace("XXX_SITEMEETING", $b['meetingonsite'], $h);
    $h = str_replace("XXX_COMMISSION", $b['commission'], $h);
    $h = str_replace("XXX_TRAVELCOST", $b['travel'], $h);
    $h = str_replace("XXX_SPOTTER", $b['spotter'], $h);
    $h = str_replace("XXX_STOREYS", $b['numstories'], $h);
    $h = str_replace("XXX_BEDROOMS", $b['numbedrooms'], $h);
    $h = str_replace("XXX_BATHROOMS", $b['numbathrooms'], $h);
    $h = str_replace("XXX_ROOMS", $b['numrooms'], $h);
    $h = str_replace("XXX_OUTBUILDINGS", $b['numoutbuildings'], $h);
    $h = str_replace("XXX_PROPERTYAGE", $b['age'], $h);
    $h = str_replace("XXX_NOTES", $b['notes'], $h);
    $h = str_replace("XXX_CONSTRUCTION", $b['construction'], $h);
    $h = str_replace("XXX_ADVICE", $b['renoadvice'], $h);
    $h = str_replace("XXX_INSPECTION", $b['pestinspection'], $h);

    $h = str_replace("XXX_COMBOARCHITECTNAME", $b['architectfirstname'] . ' ' . $b['architectlastname'], $h);
    $h = str_replace("XXX_COMBOARCHITECTMOBILE", $b['architectmobile'], $h);
    $h = str_replace("XXX_COMBOPROPERTYBOOKINGCODE", $b['bookingcode'], $h);

    $h = str_replace("XXX_COMBOINSPECTBOOKINGCODE", $b['linked_bookingcode'], $h);
    $h = str_replace("XXX_COMBOINSPECTORNAME", $b['inspectorfirstname'] . ' ' . $b['inspectorlastname'], $h);
    $h = str_replace("XXX_COMBOINSPECTORMOBILE", $b['inspectormobile'], $h);

    $h = str_replace("XXX_ITYPENAME", $userTypes[$b['usertype']], $h);

    return $h;
  }

  $rc = -1;
  $msg = "";

  try
  {
    if (isset($_POST['uuid']) && isset($_POST['archuuid']) && isset($_POST['inspectoruuid']) && isset($_POST['bookingcode']) && isset($_POST['usercreateid']) && isset($_POST['usercreatetype']))
    {
      $usercreateid = SharedGetPostVar("usercreateid");
      $usercreatetype = SharedGetPostVar("usercreatetype");
      $timberid = SharedGetPostVar("timberid");
      $propertyid = SharedGetPostVar("propertyid");
      $reportid = SharedGetPostVar("reportid");
      error_log("the created user is ");
      error_log($usercreateid);
      error_log("the created user type is ");
      error_log($usercreatetype);
      error_log("reportid: $reportid");
      error_log("propertyid: $propertyid ");
      error_log("timberid: $timberid ");

      $spotteremail = "";
      $spotterfirstname = "";
      $spotterlastname = "";
      if($reportid == 3)
      {
        error_log("combined reports, and select timber one, itype is 3,used the propertyid as id to the search");
        $searchid = $propertyid;
        $updatepropertyid = $propertyid;
        $updatetimberid = SharedGetPostVar("bookingcode");
      }
      else if ($reportid == 24)
      {
        error_log("combined reports, select the property one, itype is 24,use its own id to the search");
        $searchid = SharedGetPostVar("bookingcode");
        $updatepropertyid = SharedGetPostVar("bookingcode");
        $updatetimberid = $timberid;
      }
      // if(!empty($_POST['linkedbookingcode']))
      // {
      //   error_log("combined reports, and select timber one, itype is 3,used the linkedbookingcode as id to the search");
      //   // error_log(SharedGetPostVar("bookingcode"));
      //   $searchid = SharedGetPostVar("linkedbookingcode");
      //   $updatetimberid = SharedGetPostVar("bookingcode");
      //   $updatepropertyid = SharedGetPostVar("linkedbookingcode");
      // }
      // else if (!empty($_POST['linked_bookingcode']))
      // {
      //   error_log("combined reports, select the property one, itype is 1,use its own id to the search");
      //   // error_log(SharedGetPostVar("bookingcode"));
      //   $searchid = SharedGetPostVar("bookingcode");
      //   $updatepropertyid = SharedGetPostVar("bookingcode");
      //   $updatetimberid = SharedGetPostVar("linked_bookingcode");

      // }
      error_log("the bookingid is going to use to the search is : ");
      error_log($searchid);
      error_log("update timber report id is: ");
      error_log($updatetimberid);
      error_log("update property report id is: ");
      error_log($updatepropertyid);

      $uuid = SharedGetPostVar("uuid");
      $archuuid = SharedGetPostVar("archuuid");
      $inspectoruuid = SharedGetPostVar("inspectoruuid");
      //$bookingcode = SharedGetPostVar("bookingcode");
      //$linkedbookingcode = SharedGetPostVar("linkedbookingcode");
     
      $userid = SharedGetUserIdFromUuid($uuid, $dblink);
      $archid = SharedGetUserIdFromUuid($archuuid, $dblink);
      $inspectorid = SharedGetUserIdFromUuid($inspectoruuid, $dblink);
      error_log($archid);
      error_log($inspectorid);
      if (($archid != 0) && ($inspectorid != 0))
      {
        $dbupdate1 = "update bookings set " .
                     "users_id=$inspectorid," .
                     "datemodified=CURRENT_TIMESTAMP," .
                     "usersmodified_id=$userid " .
                     "where " .
                     "id=$updatetimberid";

        $dbupdate2 = "update bookings set " .
                     "users_id=$archid," .
                     "datemodified=CURRENT_TIMESTAMP," .
                     "usersmodified_id=$userid " .
                     "where " .
                     "id=$updatepropertyid";
        $recordsql1 = "insert into audit_log ".
                      "(bookings_id," .
                      "event, ".
                      "userscreated_id".
                      ")".
                      "values ".
                      "(".
                      $updatepropertyid ."," .
                      6 ."," .
                      SharedNullOrNum($userid, $dblink) .
                      ")";
        $recordsql2 = "insert into audit_log ".
                      "(bookings_id," .
                      "event, ".
                      "userscreated_id".
                      ")".
                      "values ".
                      "(".
                      $updatetimberid ."," .
                      6 ."," .
                      SharedNullOrNum($userid, $dblink) .
                      ")";
        error_log($recordsql1);
        error_log($recordsql2);

        $dbresult1 = SharedQuery($dbupdate1, $dblink);
        $dbresult2 = SharedQuery($dbupdate2, $dblink);
        $dbresult3 = SharedQuery($recordsql1, $dblink);
        $dbresult4 = SharedQuery($recordsql2, $dblink);

        if ($dbresult1 && $dbresult2 && $dbresult3 && $dbresult4)
        {
          $rc = 0;

          // Fetch booking details so we can email customer...
          $dbselect = "select " .
                      "b1.id bookingcode," .
                      "b1.custfirstname," .
                      "b1.custlastname," .
                      "b1.custemail," .
                      "b1.custmobile," .
                      "b1.custphone," .
                      "b1.custaddress1," .
                      "b1.custaddress2," .
                      "b1.custcity," .
                      "b1.custpostcode," .
                      "b1.custstate," .
                      "b1.numstories," .
                      "b1.numbedrooms," .
                      "b1.numbathrooms," .
                      "b1.numrooms," .
                      "b1.numoutbuildings," .
                      "b1.address1," .
                      "b1.address2," .
                      "b1.city," .
                      "b1.state," .
                      "b1.postcode," .
                      "b1.construction," .
                      "b1.age," .
                      "b1.notes," .
                      "b1.meetingonsite," .
                      "b1.renoadvice," .
                      "b1.pestinspection," .
                      "b1.commission commission," .
                      "b1.travel travel," .
                      "b1.spotter spotter," .
                      "b1.reportheader," .
                      "b1.reportnotes," .

                      "b1.estateagentcompany," .
                      "b1.estateagentcontact," .
                      "b1.estateagentmobile," .
                      "b1.estateagentphone," .

                      "b1.itype," .

                      "u1.itype usertype," .
                      "u1.email architectemail," .
                      "u1.firstname architectfirstname," .
                      "u1.lastname architectlastname," .

                      "u1.address1 architectaddress1," .
                      "u1.address2 architectaddress2," .
                      "u1.city architectcity," .
                      "u1.state architectstate," .
                      "u1.postcode architectpostcode," .
                      "u1.regno architectregno," .
                      "u1.company architectcompany," .
                      "u1.phone architectphone," .
                      "u1.mobile architectmobile," .

                      // Linked booking for combined reports... (if any)
                      // Linked is the inspector, base is architect
                      "b2.id linked_bookingcode," .
                      "b2.itype linked_itype," .
                      "u2.itype linked_usertype," .
                      "u2.email inspectoremail," .
                      "u2.firstname inspectorfirstname," .
                      "u2.lastname inspectorlastname," .

                      "u2.address1 inspectoraddress1," .
                      "u2.address2 inspectoraddress2," .
                      "u2.city inspectorcity," .
                      "u2.state inspectorstate," .
                      "u2.postcode inspectorpostcode," .
                      "u2.regno inspectorregno," .
                      "u2.company inspectorcompany," .
                      "u2.phone inspectorphone," .
                      "u2.mobile inspectormobile " .

                      "from " .
                      "bookings b1 left join users u1 on (b1.users_id=u1.id) " .
                      "            left join bookings b2 on (b2.id = $updatetimberid) " .
                      "            left join users u2 on (b2.users_id=u2.id) " .
                      "where " .
                      "b1.id=$searchid";
          error_log($dbselect);
          if ($dbresult = SharedQuery($dbselect, $dblink))
          {
            if ($numrows = SharedNumRows($dbresult))
            {
              $booking = null;
              while ($dbrow = SharedFetchArray($dbresult))
                $booking = $dbrow;
               //error_log(print_r($booking,TRUE));
               error_log($booking['commission']);
                // ChromePhp::log($booking);
                // Let customer know...
                $dbselectspotter = "select " .
                                    "email, ".
                                    "firstname, ".
                                    "lastname ".
                                    "from users ".
                                    "where ".
                                    "id=$usercreateid";
                error_log($dbselectspotter);
                if($dbspotterresult = SharedQuery($dbselectspotter, $dblink))
                {
                  if ($numrows = SharedNumRows($dbspotterresult))
                  {
                    $rc = 0;
                    while ($dbspotterrow = SharedFetchArray($dbspotterresult))
                    {
                      $spotter = $dbspotterrow;
                      $spotteremail = $spotter['email'];
                      $spotterfirstname = $spotter['firstname'];
                      $spotterlastname = $spotter['lastname'];
                      error_log($spotteremail);
                      error_log($spotterfirstname);
                      error_log($spotterlastname);
                      $linked_bookingcode = $booking['linked_bookingcode'];
                      $linked_itype = $booking['linked_itype'];
                      if($linked_itype == null)
                      {
                        $linked_itype = 3;
                      }
                      if($linked_bookingcode == null)
                      {
                        $linked_bookingcode = $timberid;
                      }

                      error_log("linked_bookingcode: $linked_bookingcode");
                      error_log("linked_itype: $linked_itype");
                      if ($booking['custemail'] != "")
                      {
                        $itype = $booking['itype'];
                        error_log("itype: $itype");
                        $emailtemplate = $reportconfirmemails[$booking['itype']];
                        $html = file_get_contents('email_architectallocation.html');
                        //error_log($html);
                        $html = str_replace("XXX_BOOKINGCODE", $updatepropertyid.'&'.$updatetimberid, $html);
                        $html = doMacros($html, $booking,$updatepropertyid);
                        
                        $custemail = explode(",",$booking['custemail']);
                        // SharedSendHtmlMail($gConfig['adminemail'], "Archicentre Australia", $custemail, $booking['custfirstname'] . ' ' . $booking['custlastname'], $booking['linked_bookingcode'] . " - " . $reportTypes[$linked_itype] . " Assessment/Inspection Confirmation", $html);
                        SharedSendHtmlMail($gConfig['adminemail'], "Archicentre Australia", $custemail, $booking['custfirstname'] . ' ' . $booking['custlastname'], $updatepropertyid.'&'.$updatetimberid . " - Combined Property Assessment & Timber Pest Inspection", $html);

                      }

                        
                        $html1 = file_get_contents('email_comboinspectornotification.html');
                        $html1 = doMacros($html1, $booking,$updatepropertyid);
                        $html2 = file_get_contents('email_comboarchitectnotification.html');
                        $html2 = doMacros($html2, $booking,$updatepropertyid);


                        if($usercreatetype == '99')
                        {
                          //The spotter is the admin, don't need to cc the email to him at all. 
                          error_log("the spotter is the admin, don't need to cc at all. only send to the assigned inspector and architect");
                          $inspectoremail = $booking['inspectoremail'];
                          $architectemail = $booking['architectemail'];
                          error_log("inspectoremail: $inspectoremail");
                          error_log("architectemail: $architectemail");
                          // Inspector notification...
                          // SharedSendHtmlMail($gConfig['adminemail'], "Archicentre Australia", $booking['inspectoremail'], $booking['inspectorfirstname'] . ' ' . $booking['inspectorlastname'], $updatetimberid . " - " . $reportTypes[$linked_itype]. " Timber Inspection Confirmation", $html1);
                          SharedSendHtmlMail($gConfig['adminemail'], "Archicentre Australia", $booking['inspectoremail'], $booking['inspectorfirstname'] . ' ' . $booking['inspectorlastname'], $updatetimberid . " - Combined Property Assessment & Timber Pest Inspection", $html1);

                          // Architect notification...
                          // SharedSendHtmlMail($gConfig['adminemail'], "Archicentre Australia", $booking['architectemail'], $booking['architectfirstname'] . ' ' . $booking['architectlastname'], $updatepropertyid . " - " .$reportTypes[$linked_itype] . " Assessment Report Confirmation", $html2);
                          SharedSendHtmlMail($gConfig['adminemail'], "Archicentre Australia", $booking['architectemail'], $booking['architectfirstname'] . ' ' . $booking['architectlastname'], $updatepropertyid . " - Combined Property Assessment & Timber Pest Inspection", $html2);

                        }
                        else
                        {
                            // the spotter is not the admin, so need to cc. 
                            // Inspector notification...
                            if($usercreateid == $inspectorid)
                            {
                              error_log("the assigned inspector is the same spotter don't need to cc");
                              // SharedSendHtmlMail($gConfig['adminemail'], "Archicentre Australia", $booking['inspectoremail'], $booking['inspectorfirstname'] . ' ' . $booking['inspectorlastname'], $updatetimberid . " - " . $reportTypes[$linked_itype] . " Timber Inspection Confirmation", $html1);
                              SharedSendHtmlMail($gConfig['adminemail'], "Archicentre Australia", $booking['inspectoremail'], $booking['inspectorfirstname'] . ' ' . $booking['inspectorlastname'], $updatetimberid . " - Combined Property Assessment & Timber Pest Inspection", $html1);

                            }
                            else
                            {
                              error_log("the assigned inspector is not the same as spooter and the spotter is not the admin, need to cc");
                              error_log($spotteremail);
                              error_log($booking['inspectoremail']);
                              // SharedSendHtmlMail($gConfig['adminemail'], "Archicentre Australia", $booking['archemail'], $booking['archfirstname'] . ' ' . $booking['archlastname'], $booking['bookingcode'] . " - " . $reportTypes[$booking['itype']] . " Assessment/Inspection Confirmation", $html,$spotteremail,$spotterfirstname." ".$spotterlastname);
                              // SharedSendHtmlMail($gConfig['adminemail'], "Archicentre Australia", $booking['inspectoremail'], $booking['inspectorfirstname'] . ' ' . $booking['inspectorlastname'], $updatetimberid . " - " . $reportTypes[$linked_itype] . " Timber Inspection Confirmation", $html1,$spotteremail,$spotterfirstname." ".$spotterlastname);
                              SharedSendHtmlMail($gConfig['adminemail'], "Archicentre Australia", $booking['inspectoremail'], $booking['inspectorfirstname'] . ' ' . $booking['inspectorlastname'], $updatetimberid . " - Combined Property Assessment & Timber Pest Inspection", $html1,$spotteremail,$spotterfirstname." ".$spotterlastname);

                            }
                            // Architect notification...
                            if($usercreateid == $archid)
                            {
                              error_log("the assigned architect is the same spotter don't need to cc");
                              // SharedSendHtmlMail($gConfig['adminemail'], "Archicentre Australia", $booking['architectemail'], $booking['architectfirstname'] . ' ' . $booking['architectlastname'], $updatepropertyid . " - " . $reportTypes[$linked_itype] . " Assessment Report Confirmation", $html2,$spotteremail,$spotterfirstname." ".$spotterlastname);
                              SharedSendHtmlMail($gConfig['adminemail'], "Archicentre Australia", $booking['architectemail'], $booking['architectfirstname'] . ' ' . $booking['architectlastname'], $updatepropertyid . " - Combined Property Assessment & Timber Pest Inspection", $html2,$spotteremail,$spotterfirstname." ".$spotterlastname);

                            }
                            else
                            {
                              error_log("the assigned architect is not the same as spooter  and the spotter is not the admin, need to cc");
                              error_log($spotteremail);
                              error_log($booking['architectemail']);
                              // SharedSendHtmlMail($gConfig['adminemail'], "Archicentre Australia", $booking['architectemail'], $booking['architectfirstname'] . ' ' . $booking['architectlastname'], $updatepropertyid . " - " . $reportTypes[$linked_itype] . " Assessment Report Confirmation", $html2,$spotteremail,$spotterfirstname." ".$spotterlastname);
                              SharedSendHtmlMail($gConfig['adminemail'], "Archicentre Australia", $booking['architectemail'], $booking['architectfirstname'] . ' ' . $booking['architectlastname'], $updatepropertyid . " - Combined Property Assessment & Timber Pest Inspection", $html2,$spotteremail,$spotterfirstname." ".$spotterlastname);

                            }
                        }
                      }
                  }
                  else
                  {
                    $msg = "Unable to fetch booking details...";
                  }
             
                }
            }
          }
        }
        else
          $msg = "Error assigning architect and inspector...";
      }
      else
        $msg = "Unable to retrieve architect and inspector details for assignment...";
    }
    else
      $msg = "Missing parameters...";
  }

  catch (Exception $e)
  {
    $msg = "Unable to assign architect and inspector...";
  }

  $response = array("rc" => $rc, "msg" => $msg);
  $json = json_encode($response);
  echo $json;
?>
