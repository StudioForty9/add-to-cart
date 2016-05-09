<?php
/**
 * Studioforty9_AjaxAddToCart
 *
 * @category  Studioforty9
 * @package   Studioforty9_AjaxAddToCart
 * @author    StudioForty9 <info@studioforty9.com>
 * @copyright 2016 StudioForty9 (http://www.studioforty9.com)
 * @license   https://github.com/studioforty9/add-to-cart/blob/master/LICENCE BSD
 * @version   0.0.1
 * @link      https://github.com/studioforty9/add-to-cart
 */

/**
 * Studioforty9_AjaxAddToCart_Block_Script
 *
 * @category   Studioforty9
 * @package    Studioforty9_AjaxAddToCart
 * @subpackage Block
 */
class Studioforty9_AjaxAddToCart_Block_Script extends Mage_Core_Block_Template
{
    /**
     * Determine whether the module is enabled or not.
     *
     * @return bool
     */
    public function isEnabled()
    {
        return Mage::helper('studioforty9_ajaxaddtocart')->isEnabled();
    }
}
