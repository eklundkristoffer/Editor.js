<?php

$html = $_POST['html'];
$css = $_POST['css'];
$js = $_POST['js'];

echo json_encode([
    'value' => $html . "<style>$css</style>" . "<script>$js</script>"
]);