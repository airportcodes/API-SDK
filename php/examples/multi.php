<?php

// load the air-port-codes library
require_once('../air-port-codes-api.php');

// Setup request parameters to override the configparams set in apc class
$params = [
    'limit' => 7,
    'size' => 3
];

// initialize the apc object
$apc = new apc('multi', $params);

// use a search term for multi type request (eg: 'new yo')
// use an airport code for a single type request (eg: 'lax')
$apcResponseObj = $apc->request('new yo'); 
?>

<pre>
<?php if ($apcResponseObj->status) : ?>
<?= print_r($apcResponseObj) ?>
<?php else : ?>
<?= $apcResponseObj->message; ?>
<?php endif ?>
</pre>