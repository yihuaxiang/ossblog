# github passkey 登陆

> 从 2023 年 3 月开始到 2023 年底，GitHub 将逐渐开始要求在 GitHub.com 上贡献代码的所有用户启用一种或多种形式的双因素身份验证 (2FA)。 如果你在符合条件的组中，当选择该组进行注册时，将收到一封通知电子邮件，该电子邮件标志着 45 天的 2FA 注册期的开始，并且你会看到要求你在 GitHub.com 上注册 2FA 的横幅。 如果未收到通知，则表示你不是需要启用 2FA 的组的成员，但我们强烈建议启用 2FA。


### 登陆的苦恼

GitHub 的双重验证，也称为双因素认证（2FA），是一种安全措施，用于在用户登录时提供额外的保护。启用双重验证后，用户在输入账户的用户名和密码进行登录时，还需要提供第二个验证因素，如一次性密码（TOTP）

由于开启了双因素认证，每次登录都需要拿起手机、打开 Authenticator ，输入一次性密码（TOTP），甚是烦恼😣


<ImgView title="登陆的苦恼" url="https://3.z.wiki/autoupload/20231211/MGis.1216X1006-image.png" />


步骤繁琐也就罢了，我还经常思考，如果一旦手机丢了我该怎么才能登录 GitHub 呢？

》 思考


当让 GitHub 告诉我无法获取一次性密码（TOTP）的时候可以使用 recovery code 进行恢复，然而理想很丰满现实很骨感，这种一年不用一次的 recovery code 等你真用的时候真的找得到吗？🤔


### 谷歌的双因子认证

对比之下，谷歌的双因子认证就方便的多了。


<ImgView title="谷歌的双因子认证" url="https://1.z.wiki/autoupload/20231211/mb9S.1808X1212-image.png" />

谷歌支持如下双因子认证方式：

* 其他谷歌 APP
* Authenticator
* 手机验证码
* 备用验证码

其中我最喜欢的就数手机验证码了，因为我随时随地就能获取到，更为关键的是：手机丢了可以补办手机卡，不影响登录。


那 GitHub 为什么不提供手机验证码呢？🤔


查看了 GitHub 的 F2A 文档，原来是在国内不支持 😑

<ImgView title="github的双因子认证" url="https://1.z.wiki/autoupload/20231211/jE0N.1904X1306-image.png" />

没办法，天朝自有国情在。

[支持 SMS 身份验证的国家/地区](https://docs.github.com/zh/authentication/securing-your-account-with-two-factor-authentication-2fa/countries-where-sms-authentication-is-supported)

### 更方便的方式

***Passkey***

GitHub 的 Passkey 是一种基于 [WebAuthn](https://webauthn.io/)（Web 身份认证）标准的无密码认证方式。WebAuthn 是一个由 W3C 和 FIDO 联盟开发的网络标准，它允许用户只需使用生物识别（如指纹或面部识别）、安全密钥或其他本地身份验证手段，而不需输入传统的密码来登录和认证网络服务。这种技术是 FIDO2 标准的一部分，旨在为用户提供更为安全和便捷的登录体验。

WebAuthn 原理如下：


#### 注册过程（用户注册新设备）

<ImgView title="webauthn" url="https://0.z.wiki/autoupload/20231211/NfY9.1207X1080-image.png" />

* 用户请求注册：用户在支持WebAuthn的网站上请求注册一个新的认证器设备（如指纹扫描器、面部识别摄像头、安全密钥等）。

* 网站生成 Challenge：网站创建一个随机生成的“Challenge”（也就是一串随机数）并发给用户的设备。

* 用户验证身份：用户通过本地设备上的生物识别技术、PIN码或其他方式验证身份。

* 创建密钥对：一旦用户验证成功，设备会生成一对密钥，包括一个私钥（永远不离开设备，安全存储）和一个公钥。

* 注册公钥：设备使用私钥对“Challenge”签名，并连同公钥和签名发送回网站。网站将公钥存储为用户的认证凭证。

#### 登录过程（用户使用已注册设备认证）

<ImgView title="webauthn" url="https://0.z.wiki/autoupload/20231211/z9qx.1207X1080-image.png" />

* 用户请求登录：用户尝试登录支持WebAuthn的网站。

* 网站生成 Challenge：网站再次生成一个随机“Challenge”并发给用户的设备。

* 用户验证身份：用户通过本地设备验证身份，就像注册过程一样。

* 设备签名：设备使用存储的私钥对“Challenge”签名。

* 验证签名：设备将签名和其他信息（如认证器数据）发送给网站，网站利用之前存储的公钥来验证签名的有效性。

* 如果签名验证成功，意味着用户已经成功验证了他们的身份，用户就可以完成登录过程。这一过程不仅不需要用户输入密码，而且因为私钥永远不离开用户的设备，也增加了安全性。

此外 WebAuthn 还支持跨平台认证，这意味着用户可以使用手机或其他移动设备来认证笔记本电脑或台式电脑上的登录过程。

这种基于公钥加密和本地验证的方法提供了一个更安全、更难以伪造的用户认证方式，因为它依赖用户拥有的物理设备和/或生物特征，而这些都是难以被黑客远程窃取的。

### 浏览器兼容性

[MDN Web Authentication API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Authentication_API#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)

<ImgView title="webauthn" url="https://6.z.wiki/autoupload/20231211/W0YU.1936X1424-image.png" />
