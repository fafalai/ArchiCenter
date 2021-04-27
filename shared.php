<?php
  require_once("class.phpmailer.php");

  $gConfig['dbname'] = "arch";
  // $gConfig['dbname'] = "archtest"; //This is for test site
 $gConfig['dbserver'] = "localhost:3306";
//  $gConfig['dbserver'] = "localhost:8889";//This is for test site
 $gConfig['dbport'] = 3306;
//  $gConfig['dbport'] = 8889;//This is for test site

  $gConfig['dbusername'] = "arch";
  $gConfig['dbpwd'] = "lmi$$";
  $gConfig['dberrormsg'] = "";
  $gConfig['smtp-user'] = "noreply@adtalk.services";
  $gConfig['smtp-password'] = "adtalk\$\$00";
  $gConfig['smtp-host'] = "mail.adtalkserver.net";

  // $gConfig['adminemail'] = "office@archicentreaustralia.com.au";
  // $gConfig['bccemail'] = "archive@archicentreaustralia.com.au";
  //$gConfig['adminemail'] = "M0410898213@126.com";
  // $gConfig['adminemail'] = "emily92308@126.com";
  $gConfig['adminemail'] = "fafa.lai@adtalk.com.au";
  //$gConfig['adminemail'] = "mitchamrumpus@gmail.com";

  $reportTypes =
  [
    "",
    "Property Assessment Report",
    "Timber Pest Inspection Report", 
    //"Combined Timber Pest Inspection Report",
    "Timber Pest Inspection Report", // This is the report for the combined report - Timber Pest Inspection report 
    "Maintenance Advice Report",
    "Architect's Advice Report",
    "Construction Quality Assurance - Stage 1 Report",
		"Construction Quality Assurance - Stage 2 Report",
		"Construction Quality Assurance - Stage 3 Report",
		"Construction Quality Assurance - Stage 4 Report",
		"Construction Quality Assurance - Stage 5 Report",
		"Construction Quality Assurance - Stage 6 Report",
		"Construction Quality Assurance - Stage 7 Report",
		"Construction Quality Assurance - Stage 8 Report",
		"Design Consultation Report",
    "Dilapidation Survey Report",
    "Home Feasibility Report",
    "Renovation Feasibility Report",
    "Residential Home Warranty Report",
    "Property Assessment - Commercial Report",
    //"Commercial Dilapidation Survey",
    "",
    "Home Access & Services - Residential Report",
    "Post-Dilapidation Survey Report",
    "Quote Report",
    "Combined Property Assessment & Timber Pest Report",
    "Property Assessment - Type A Report"
  ];

  $reportTypes2 =
  [
    "",
    "Property Assessment Report",
    "Timber Pest Inspection Report", 
    //"Combined Timber Pest Inspection Report",
    "Timber Pest Inspection Report", // This is the report for the combined report - Timber Pest Inspection report 
    "Maintenance Advice Report",
    "Architect's Advice Service",
    "Construction Quality Assurance - Stage 1 Report",
		"Construction Quality Assurance - Stage 2 Report",
		"Construction Quality Assurance - Stage 3 Report",
		"Construction Quality Assurance - Stage 4 Report",
		"Construction Quality Assurance - Stage 5 Report",
		"Construction Quality Assurance - Stage 6 Report",
		"Construction Quality Assurance - Stage 7 Report",
		"Construction Quality Assurance - Stage 8 Report",
		"Design Consultation Report",
    "Dilapidation Survey Report",
    "Home Feasibility Report",
    "Renovation Feasibility Report",
    "Residential Home Warranty Report",
    "Property Assessment - Commercial Report",
    //"Commercial Dilapidation Survey",
    "",
    "Home Access & Services - Residential Report",
    "Post-Dilapidation Survey Report",
    "Quote Report",
    "Combined Property Assessment & Timber Pest Report",
    // "Property Assessment - Type A Report"
    "Property Assessment - Optional Header"
  ];

  $reportfiles =
  [
    "",
    "AssessmentReport.php",
    "TimberReport.php",
    "",
    "MaintenanceReport.php",
    "ArchitectAdviceReport.php",
    "ConstructionReport.php",
		"ConstructionReport.php",
		"ConstructionReport.php",
		"ConstructionReport.php",
		"ConstructionReport.php",
		"ConstructionReport.php",
		"ConstructionReport.php",
		"ConstructionReport.php",
		"DesignConsultationReport.php",
    "DilapidationReport.php",
    "HomeFeasibilityReport.php",
    "RenovationFeasibilityReport.php",
    "HOWReport.php",
    "CommercialPropertyReport.php",
    //"CommercialDilapidationSurvey.php",
    "",
    "HomeAccessReport.php",
    "PostDilapidationReport.php",
    "",
    "AssessmentReport.php",
    "AssessmentReportTypeA.php"
  ];
  //this is for email customer when the booking is finsihed with the attachment
  $reportemails =
  [
    "",
    "email_prop_assess_report.html",
    "email_timberpestinspection.html",
    "email_combinedreports.html",
    "email_maintenance.html",
    "email_archadvice.html",
    "email_constructionqa_stage1.html",
		"email_constructionqa_stage2.html",
		"email_constructionqa_stage3.html",
		"email_constructionqa_stage4.html",
		"email_constructionqa_stage5.html",
		"email_constructionqa_stage6.html",
		"email_constructionqa_stage7.html",
		"email_constructionqa_stage8.html",
    "email_designconsult.html",
		"email_dilapidation.html",
    "email_homefeasibility.html",
    "email_renofeasibility.html",
    "email_how.html",
    "email_commpropertyassessment.html",
    //"email_commdilapidation.html",
    //"email_how.html",
    "",
    "email_has.html",
		"email_dilapidationpost.html",
    "",
    "",
    "email_prop_assess_typeA_report.html"
  ];
  // this is for the inspector allocation.
  $reportconfirmemails =
  [
    "",
		"email_propertyassessment_allocate.html",
		"email_timberpestinspection_allocate.html",
    "",
    "email_maintenance_allocate.html",
		"email_archadvice_allocate.html",
		"email_constructionqa_allocate_stage1.html",
		"email_constructionqa_allocate_stage2.html",
		"email_constructionqa_allocate_stage3.html",
		"email_constructionqa_allocate_stage4.html",
		"email_constructionqa_allocate_stage5.html",
		"email_constructionqa_allocate_stage6.html",
		"email_constructionqa_allocate_stage7.html",
		"email_constructionqa_allocate_stage8.html",
    "email_designconsult_allocate.html",
		"email_dilapidation_allocate.html",
		"email_homefeasibility_allocate.html",
		"email_renofeasibility_allocate.html",
		//"email_commpropertyassessment_allocate.html",
    //"email_commdilapidation_allocate.html",
    "email_how_allocate.html",
    "email_commericalproperty_allocate.html",
    "",
    "email_has_allocate.html",
    "email_dilapidationpost_allocate.html",
    "email_quote_allocate.html",
    "",
    "email_propertyassessmenttypea_allocate.html",
  ];
  $userTypes =
  [
    "",
    "architects",
    "inspectors",
    "",
    ""
  ];

  date_default_timezone_set("Australia/Melbourne");
  ini_set("auto_detect_line_endings", true);

  $isphp5 = false;
  $dblink = null;

  if (version_compare(phpversion(), "5.5.0", "<"))
    $isphp5 = true;

  function SharedBeginTx($dblink)
  {
    global $isphp5;
    if ($isphp5)
    {
      mysql_query("SET AUTOCOMMIT=0");
      mysql_query("start transaction");
    } 
    else
      mysqli_begin_transaction($dblink, MYSQLI_TRANS_START_READ_WRITE);
  }

  function SharedCommit($dblink)
  {
    global $isphp5;
    if ($isphp5)
       mysql_query("COMMIT");
    else
      mysqli_commit($dblink);
  }

  function SharedRollback($dblink)
  {
    global $isphp5;
    if ($isphp5)
      mysql_query("ROLLBACK");
    else
      mysqli_rollback($dblink);
  }

  function SharedQuery($dbquery, $dblink)
  {
    global $isphp5;

    $dbresult = null;

    if ($isphp5)
      $dbresult = mysql_query($dbquery, $dblink);
    else
      $dbresult = mysqli_query($dblink, $dbquery);

    return ($dbresult);
  }

  function SharedNumRows($dbresult)
  {
    global $isphp5;

    $numrows = false;

    if ($isphp5)
      $numrows = mysql_num_rows($dbresult);
    else
      $numrows = mysqli_num_rows($dbresult);

    return ($numrows);
  }

  function SharedGetInsertId($dblink)
  {
    global $isphp5;

    $id = null;

    if ($isphp5)
      $id = mysql_insert_id($dblink);
    else
      $id = mysqli_insert_id($dblink);

    return ($id);
  }

  function SharedFetchArray($dbresult)
  {
    global $isphp5;

    $dbrow = false;

    if ($isphp5)
      $dbrow = mysql_fetch_array($dbresult, MYSQL_ASSOC);
    else
      $dbrow = mysqli_fetch_array($dbresult);

    return ($dbrow);
  }

  function SharedConnect()
  {
    global $isphp5;

    $dblink = false;

    try
    {
      global $gConfig;

      if ($isphp5)
      {
        $dblink = mysql_connect($gConfig['dbserver'], $gConfig['dbusername'], $gConfig['dbpwd']);
        if ($dblink)
        {
          if (!mysql_select_db($gConfig['dbname'], $dblink))
          {
            mysql_close($dblink);
            $dblink = false;
          }
        }
      }
      else
      {
        $dblink = mysqli_init();
        if (!mysqli_real_connect($dblink, $gConfig['dbserver'], $gConfig['dbusername'], $gConfig['dbpwd'], $gConfig['dbname'], $gConfig['dbport']))
          $dblink = false;
      }
    }

    catch (Exception $e)
    {
      error_log("Exception in " . $e->getFile() . " line " . $e->getLine() . ": " . $e->getMessage());
    }

    return ($dblink);
  }

  function SharedInit()
  {
    session_start();
    if (!isset($_SESSION['uuid']))
    {
      $_SESSION['uuid'] = "";
      $_SESSION['username'] = "";
      $_SESSION['useremail'] = "";
      $_SESSION['itype'] = 0;
    }
  }

  function SharedCleanString($text, $maxlen)
  {
    if ($text != "")
    {
      $text = trim($text);
      if ($text != "")
      {
        if ($maxlen < 1)
          $maxlen = 1;
        $text = substr($text, 0, $maxlen);
      }
    }
    return ($text);
  }

  function SharedNullOrQuoted($val, $len, $dblink)
  {
    global $isphp5;

    $rc = "null";
    $val = trim($val);

    if ($val != "")
    {
      if ($isphp5)
        $rc = "'" . mysql_real_escape_string($val, $dblink) . "'";
      else
        $rc = "'" . mysqli_real_escape_string($dblink, $val) . "'";
    }

    return ($rc);
  }

  function SharedNullOrNum($val, $dblink)
  {
    global $isphp5;

    $rc = "null";
    $val = trim($val);

    if ($val != "")
      $rc = $val;

    return ($rc);
  }

  function SharedLogin($email, $pwd)
  {
    try
    {
      global $gConfig;
      global $dblink;

      $gConfig['dberrormsg'] = "";
      $rc = false;

      if (!isset($_SESSION['uuid']) || ($_SESSION['uuid'] == ""))
      {
        $dbselect = "select " .
                    "u1.uuid," .
                    "u1.email," .
                    "u1.firstname," .
                    "u1.lastname," .
                    "u1.itype " .
                    "from " .
                    "users u1 " .
                    "where " .
                    "u1.email=" . SharedNullOrQuoted(SharedCleanString($email, 100), 100, $dblink) . " " .
                    "and " .
                    "u1.pwd=" . SharedNullOrQuoted(SharedCleanString($pwd, 50), 50, $dblink) . " " .
                    "and " .
                    "u1.active=1";
        error_log($dbselect);
        if ($dbresult = SharedQuery($dbselect, $dblink))
        {
          if ($numrows = SharedNumRows($dbresult))
          {
            $gConfig['dberrormsg'] = "No such user.";

            while ($dbrow = SharedFetchArray($dbresult))
            {
              error_log("set session");
              $_SESSION['uuid'] = $dbrow['uuid'];
              $_SESSION['username'] = $dbrow['firstname'] . " " . $dbrow['lastname'];
              $_SESSION['useremail'] = $dbrow['email'];
              $_SESSION['itype'] = intval($dbrow['itype']);
            }

            if ($_SESSION['uuid']  != "")
            {
              $rc = true;
              error_log("Login successful by " . $email);
            }
            else
              error_log("Login failed by " . $email);
          }
          else
          {
            $gConfig['dberrormsg'] = "Invalid login...";
            error_log($gConfig['dberrormsg']);
            $rc = false;
          }
        }
        else
        {
          $gConfig['dberrormsg'] = "Unable to query database for login credentials";
          error_log($gConfig['dberrormsg']);
          $rc = false;
        }
      }
      else
        $rc = true;
    }

    catch (Exception $e)
    {
      error_log("Exception in " . $e->getFile() . " line " . $e->getLine() . ": " . $e->getMessage());
    }

    return ($rc);
  }

  function SharedLogout()
  {
    try
    {
      unset($_SESSION['uuid']);
      unset($_SESSION['username']);
      unset($_SESSION['useremail']);
      unset($_SESSION['itype']);

      session_unset();
      session_destroy();
      session_write_close();
    }

    catch (Exception $e)
    {
      error_log("Exception in " . $e->getFile() . " line " . $e->getLine() . ": " . $e->getMessage());
    }
  }

  function SharedIsLoggedIn()
  {
    if (isset($_SESSION['uuid']))
    {
      if ($_SESSION['uuid'] == "")
        return (false);
      return (true);
    }

    return (false);
  }

  function SharedIsDev()
  {
    error_log("SharedIsDev:");
    error_log($_SERVER['SERVER_ADDR']);
    $allowed[0] = "::1";
    $allowed[1] = "127.0.0.1";
    $allowed[2] = "localhost";
    $allowed[3] = "202.134.37.227";
    $allowed[4] = '111.223.237.110';
    if (in_array($_SERVER['SERVER_ADDR'], $allowed))
    {
      error_log("go to production site address");
      return (true);
    }
    else
    {
      error_log("go to testing site address");
      return (false);
    }
    
    
  }

  function SharedIsAdmin()
  {
    return isset($_SESSION['itype']) ? ((int)$_SESSION['itype'] == 99) : false;
  }

  function SharedIsMember()
  {
    return isset($_SESSION['itype']) ? ((int)$_SESSION['itype'] == 1) : false;
  }

  function SharedIsArchitect()
  {
    return isset($_SESSION['itype']) ? ((int)$_SESSION['itype'] == 2) : false;
  }

  function SharedIsAgentt()
  {
    return isset($_SESSION['itype']) ? ((int)$_SESSION['itype'] == 3) : false;
  }

  function SharedGetUserIdFromUuid($uuid, $dblink)
  {
    $id = 0;

    // Special case...
    if ($uuid == 'admin')
      return 1;

    $dbselect = "select u1.id from users u1 where u1.uuid=" . SharedNullOrQuoted($uuid, 20, $dblink);

    if ($dbresult = SharedQuery($dbselect, $dblink))
    {
      if ($numrows = SharedNumRows($dbresult))
      {
        while ($dbrow = SharedFetchArray($dbresult))
          $id = $dbrow['id'];
      }
    }
    return ($id);
  }

  function SharedMakeUuid($len = 20, $upper = false)
  {
    $hex = md5("ianp" . uniqid("", true));

    $pack = pack('H*', $hex);

    // Max 22 chars
    $uid = base64_encode($pack);

    // Mixed case...
    $uid = preg_replace("#[^A-Za-z0-9]#", "", $uid);

    // Uppercase only...
    if ($upper)
      $uid = preg_replace("#[^A-Z0-9]#", "", strtoupper($uid));

    // Sanity checks
    if ($len < 4)
      $len = 4;
    if ($len > 128)
      $len = 128;

    // Append until desired length...
    while (strlen($uid) < $len)
      $uid = $uid . SharedMakeUuid(22);

    return substr($uid, 0, $len);
  }

  function SharedSendHtmlMail($from, $fromName, $to, $toName, $subject, $msg, $cc = "", $ccName = "", $attachment = "")
  {
    $rc = false;
    // error_log("sending email");
    // error_log("from ");
    // error_log($from);
    // error_log("to");
    // error_log($to);
    try
    {
      global $gConfig;
      $mail           = new PHPMailer(true);
      $mail->SMTPAuth = true;
      $mail->Port     = 25;
      $mail->Host     = $gConfig['smtp-host'];
      $mail->Username = $gConfig['smtp-user'];
      $mail->Password = $gConfig['smtp-password'];
      $mail->Subject  = $subject;
      $mail->IsSMTP();
      $mail->MsgHTML($msg);
      $mail->SetFrom($from, $fromName);
      //$mail->AddBCC('archive@archicentreaustralia.com.au');
      //$mail->AddBCC('M0410898213@126.com');

      if (is_array($to))
      {
        error_log("the emailaddress is an array");
        foreach ($to as $idx=>$t)
        {
          error_log($t);
          $mail->AddAddress($t, $toName);
        }
          
      }
      else if (is_string($to))
      {
        //error_log("one email address");
        // error_log($to);
        if ($to != "")
          $mail->AddAddress($to, $toName);
      }

      if (is_array($cc))
      {
        foreach ($cc as $idx=>$c)
          $mail->AddCC($c, $ccName[$idx]);
      }
      else if (is_string($cc))
      {
        if ($cc != "")
        {
          error_log($cc);
          error_log($ccName);
          $mail->AddCC($cc,$ccName);
        }
         
      }

      if (is_array($attachment))
      {
        error_log("the attachment is an array");
        foreach ($attachment as $a)
          {
            error_log($a);
            $mail->AddAttachment($a);
        }
      }
      else if (is_string($attachment))
      {
        if ($attachment != "")
          $mail->AddAttachment($attachment);
      }

      $rc = $mail->Send();
    }

    catch (phpmailerException $e)
    {
      error_log($e->errorMessage());
    }

    return ($rc);
  }

  function SharedGetPostVar($varname, $maxlen = 50, $default = null)
  {
    if (isset($_POST[$varname]))
    {
      $len = 50;
      if (isset($maxlen))
        $len = $maxlen;

      $v = substr($_POST[$varname], 0, $len);
      return $v;
    }

    return $default;
  }

  function doNiceAddress($address1, $city, $state, $postcode)
  {
    $a = ucwords($address1);

    if ($a != "")
    {
      if ($city != "")
        $a .= ", " . ucwords($city);
    }

    if ($a != "")
    {
      if ($state != "")
        $a .= ", " . $state;
    }

    if ($a != "")
    {
      if ($postcode != "")
        $a .= " " . $postcode;
    }

    return ($a);
  }

  function doNiceArrayElemAsString($i, $titlecase = true)
  {
    global $booking;
    //error_log(print_r($booking),TRUE);

    if (count($booking) == 0)
      return ("");

    if ($titlecase)
      return ucwords($booking[$i]);

    return $booking[$i];
  }

  // ************************************************************************
  // Start...

  $scriptname = basename($_SERVER['SCRIPT_NAME']);

  if (substr($scriptname, 0, 5) != "ajax_")
  {
    SharedInit();
  }

  $dblink = SharedConnect();
?>
