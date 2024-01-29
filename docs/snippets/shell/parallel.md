# shell 并发执行


并发执行`curl`

```shell
xargs -I % -P 8 curl -X POST  "https://z.wiki"  < <(printf '%s\n' {1..4})
```
