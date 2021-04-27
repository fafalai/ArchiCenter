<?php
  require_once("shared.php");
  // require_once('ilovepdf-php/init.php');
  // use Ilovepdf\CompressTask;

  $rc = -1;
  $msg = "";
  $passingText = "";
  $files = [];
  $booking = Array();
  global $reportTypes;

  try
  {
    $bookingcode = SharedGetPostVar("bookingcode");

    //$data = SharedGetPostVar("pdfBase64");

    $pdfBase64 = $_POST["pdfBase64"];
   // $permission = $pdfBase64;

    $newFileName = './pdfreport/draft_'.$bookingcode.".pdf";

    $file = fopen($newFileName,"w");
    //convert passing base64 to binary data, so can be written into pdf.
    $newFileContent = base64_decode($pdfBase64);
    if (fwrite($file, $newFileContent) !== false)
    {
      $rc = 0;
      $msg = 'Save PDF Report Successfully';
      //$msg = 'Loading PDF';
      $passingText = $bookingcode;
      error_log("no need to send the email with link to the office email");
      fclose($file);
    }
    else
    {
      $msg = 'Save Report unsuccessful';
    }
  }

  catch (Exception $e)
  {
    $msg = "Unable to add photo...";
  }

  $response = array("rc" => $rc, "msg" => $msg,"passingText" => $passingText);
  $json = json_encode($response); 
  echo $json;
?>