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
 * Studioforty9_AjaxAddToCart_Block_Messages_Success
 *
 * @category   Studioforty9
 * @package    Studioforty9_AjaxAddToCart
 * @subpackage Block
 */
class Studioforty9_AjaxAddToCart_Block_Messages_Success extends Mage_Core_Block_Template
{
    /**
     * Determine if the product is configurable.
     *
     * @return bool
     */
    public function isConfigurable()
    {
        $codeType = Mage_Catalog_Model_Product_Type_Configurable::TYPE_CODE;
        if ($this->hasProduct() && $codeType === $this->getProductType()) {
            return true;
        }

        return false;
    }

    /**
     * Get the product type.
     *
     * @return string
     */
    public function getProductType()
    {
        return $this->getProduct()->getTypeId();
    }
}
