(module
  (func $retrieveParameters (param $lhs i32) (param $rhs i32) (result i32)
    get_local $lhs
    get_local $rhs
    i32.add)
  (export "add" (func $add))
)

(module
  (import "window" "console" "log" "url" "body"  (func $log (param i32)))
  (import "js" "mem" (memory 1)) 
  (data (i32.const 0) "Hi")
  (func (export "logIt")
    i32.const 0 ;; pass offset 0 to log
    i32.const 2 ;; pass length 2 to log
    call $log))

