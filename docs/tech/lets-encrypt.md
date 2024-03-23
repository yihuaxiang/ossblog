# Let's Encrypt 证书

### 阿里云证书

一直是[阿里云](http://aliyun.com/)的忠实粉丝，从上学的时候就开始用阿里云的服务，到现在十多年了。

网站的证书也一直用阿里云的免费证书，免费证书是一年有效期，到期后需要手动更新，人力成本倒也可控。

<ImgView title="阿里云证书" url="https://2.z.wiki/autoupload/20240323/o3Zk.266X2442-image.png" />


然而 23 年年底服务调整，有效期统一改为 3 个月。

> 对于免费领取的SSL证书，签发后的证书有效期统一变更为3个月。如果您希望继续使用12个月有效期的免费证书，则需收取相关服务费，费用为68元/张/年。购买以及升级指南，请参见申请免费DV单域名试用证书和免费版SSL证书升级指南。

<ImgView title="阿里云证书" url="https://1.z.wiki/autoupload/20240323/UzdD.1028X1848-image.png" />

目前我申请了十多个证书，三个月一次手动更新成本确实高了点。

### 新证书

简单问了下 ChatGPT，目前就流行的免费证书为 [Let's Encrypt](https://letsencrypt.org/)，不仅免费，还能通过程序自动化更新。

<ImgView title="Let's Encrypt 证书" url="https://3.z.wiki/autoupload/20240323/PxjN.148X234-image.png" />



参考文档：[How to Install Let’s Encrypt (Certbot) on CentOS 8](https://tecadmin.net/how-to-install-certbot-on-centos-8/)


通过脚本一键更新证书，后续还可以结合 [crontab](https://z.wiki/snippets/shell/crontab.html) 自动更新，再也不用关心证书的事情啦。

<ImgView title="Let's Encrypt 证书" url="https://8.z.wiki/autoupload/20240323/EIFt.2106X2918-image.png" />

