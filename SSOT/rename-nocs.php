<?php

/**
 * Rename files that start with 2016 NOC codes.
 * Tested on Linux only.
 *
 * Usage: php rename-nocs.php /path/to/files
 */

if (empty($argv[1]) || !is_dir($argv[1])) {
  die("Usage: php {$argv[0]} /path/to/files\n");
}

// Build a concordance table that maps each 2016 code to one or more 2021 codes.
$concordance = array_reduce(json_decode(file_get_contents('./ssot_nocs.json')), function($concordance, $entry) {
  foreach (explode(',', $entry->noc_2016) as $noc_2016) {
    if (!array_key_exists($noc_2016, $concordance)) {
      $concordance[$noc_2016] = [$entry->noc_2021];
    }
    else {
      $concordance[$noc_2016][] = $entry->noc_2021;
    }
  }
  return $concordance;
}, []);

// List the files and rename them according to the concordance above.
// Remember the NOC 2016 for each file renamed.
// In case of colliding names, don't rename a second time.
// Log each error / warning / successful operation.
$files = glob_recursive(rtrim($argv[1], '/').'/*.png');
$out_files = [];
foreach ($files as $file) {
  if (!preg_match('/\/(\d{4})-NOC/i', $file, $matches)) {
    fwrite(STDOUT, "WARNING: File {$file} does not conform to the expected naming. Ignoring\n");
    continue;
  }
  $noc_2016 = $matches[1];
  if (!array_key_exists($noc_2016, $concordance)) {
    fwrite(STDOUT, "ERROR: File {$file} not found in concordance. Ignoring\n");
    continue;
  }
  foreach ($concordance[$noc_2016] as $noc_2021) {
    $out_file = str_replace($noc_2016, $noc_2021, $file);
    if (array_key_exists($out_file, $out_files)) {
      fwrite(STDOUT, "ERROR: File {$out_file} for NOC {$noc_2016} was already renamed for NOC {$out_files[$out_file]}. Ignoring\n");
    }
    else {
      $out_files[$out_file] = $noc_2016;
      copy($file, $out_file);
      fwrite(STDOUT, "INFO: File {$file} successfully renamed as {$out_file}\n");
    }
  }
}
fwrite(STDOUT, "INFO: Renamed " . count($out_files) . " files.");

// https://stackoverflow.com/a/12109100/209184
function glob_recursive($pattern, $flags = 0) {
  $files = glob($pattern, $flags);
  foreach (glob(dirname($pattern).'/*', GLOB_ONLYDIR|GLOB_NOSORT) as $dir) {
    $files = array_merge($files, glob_recursive($dir.'/'.basename($pattern), $flags));
  }
  return $files;
}
