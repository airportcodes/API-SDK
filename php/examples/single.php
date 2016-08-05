<?php

// load the air-port-codes library
require_once('../air-port-codes-api.php');

// initialize the apc object
$apc = new apc('single');

// use a search term for multi type request (eg: 'new yo')
// use an airport code for a single type request (eg: 'lax')
$apcResponseObj = $apc->request('jfk'); 
?>

<pre>
<?php if ($apcResponseObj->status) : ?>
<?= print_r($apcResponseObj) ?>
<?php else : ?>
<?= $apcResponseObj->message; ?>
<?php endif ?>
</pre>