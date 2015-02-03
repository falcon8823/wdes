# カレントディレクトリをパスに追加
$:.unshift File.dirname(__FILE__)
# libをパスに追加
$:.unshift File.join(File.dirname(__FILE__), 'lib')

require 'wdes'
