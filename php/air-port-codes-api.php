<?php
/*! 
 * The main PHP library for accessing the Air-port-codes API
 * 
 * @license MIT license
 * apc library v1.0.0 | (c) 2016 AIR-PORT-CODES | Air-port-codes.com/terms-of-use
 */
class apc {

    /**
     * Enter your API Key here (Required)
     * @var string
     */
    protected $api_key = 'xxxxxxxxxx';

    /**
     * The secret key, necessary for requests that don't provide a referrer
     * @var string
     */
    protected $api_secret = NULL;

    /////////////// DON'T EDIT BELOW HERE ////////////////////
        
    /**
     * Air-port-codes endpoint
     * @var string
     */
    protected $uri = 'https://www.air-port-codes.com/api/v1/';

    /**
     * set default parameters for request
     * @var array
     */
    protected $configParams = [];

    /**
     * the type of request
     * @var string - multi | single
     */
    protected $type;

    /**
     * initializes the object
     * @param string $type   sets the type of request (multi | single)
     * @param array  $config override configParams
     */
    public function __construct($type, $config=[]) {
        $this->type = $type;
        $this->uri .= $type;
        if (is_array($config)) {
            $this->configParams = array_merge($this->configParams, $config);
        }
    }

    /**
     * handles the logic to make the proper endpoint request
     * @param  string $data depending on the type, it should be either search term or the iata code
     * @return object       the output from the endpoint
     */
    public function request($data=null) {
        if ($data) {
            $newParam = null;
            switch($this->type) {
                case 'multi' :
                    $newParam = 'term';
                break;
                case 'single' :
                    $newParam = 'iata';
                break;
            }
            $params = array_merge($this->configParams, [$newParam => $data]);
        } else {
            $params = $this->configParams;            
        }
        return $this->do_curl($params);
    }

    /**
     * handles the curl request
     * @param  array $params all of the request parameters
     * @return object         the decoded json result from the endpoint
     */
    protected function do_curl($params) {
        // Get cURL resource
        $curl = curl_init();

        // Set some options - we are passing in a useragent too here
        curl_setopt_array($curl, [
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_AUTOREFERER => true,
            CURLOPT_REFERER => $this->get_page_url(),            
            CURLOPT_URL => $this->uri . '?' . http_build_query($params)
        ]);

        $headers[] = 'APC-Auth: ' . $this->api_key;
        if ($this->api_secret) {
            $headers[] = 'APC-Auth-Secret: ' . $this->api_secret;
        }
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);

        // Send the request & save response to $resp
        $resp = curl_exec($curl);

        // Close request to clear up some resources
        curl_close($curl);

        return json_decode($resp);        
    }

    /**
     * retrieves the webpage referrer
     * @return string the referrer page url
     */
    protected function get_page_url()
    {
        if (!$_SERVER["SERVER_NAME"]) {
            return NULL;
        }

        $pageURL = (@$_SERVER["HTTPS"] == "on") ? "https://" : "http://";
        $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
        return $pageURL;
    }
}