<?php

class Studioforty9_AjaxAddToCart_Block_Messages_Success extends Mage_Core_Block_Template
{
    public function isConfigurable()
    {
        if ($this->hasProductType() && Mage_Catalog_Model_Product_Type_Configurable::TYPE_CODE === $this->getProductType()) {
            return true;
        }

        return false;
    }
}
