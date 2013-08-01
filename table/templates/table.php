<?php

class <%= _.capitalize(tableName) %>Row extends Pix_Table_Row
{
}

class <%= _.capitalize(tableName) %> extends Pix_Table
{
    public $_name = '<%= tableName.toLowerCase() %>';
    public $_rowClass = '<%= _.capitalize(tableName) %>Row';

    public function init()
    {
        $this->primary = 'id';

        $this->_columns['id'] = ['type' => 'int', 'size' => 10, 'unsigned' => true, 'auto_increment' => true];
        $this->_columns['name'] = ['type' => 'varchar', 'size' => 255];
    }
}
