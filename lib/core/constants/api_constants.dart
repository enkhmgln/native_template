enum OtpType {
  register(0, 'Бүртгүүлэх'),
  resetPassword(1, 'Нууц үг сэргээх'),
  changeEmail(2, 'Имэйл өөрчлөх');

  const OtpType(this.value, this.label);

  final int value;
  final String label;
}

enum ContactType {
  phone(0, 'Утас', 'phone-call.svg'),
  mail(1, 'Имэйл', 'envelope.svg'),
  facebook(2, 'Facebook', 'facebook.svg'),
  instagram(3, 'Instagram', 'instagram.svg'),
  x(4, 'X', 'twitter-alt-circle.svg'),
  website(5, 'Веб сайт', 'global-research.svg');

  const ContactType(this.value, this.label, this.icon);

  final int value;
  final String label;
  final String icon;
}

enum UserSex {
  female(0, 'Эмэгтэй'),
  male(1, 'Эрэгтэй');

  const UserSex(this.value, this.label);

  final int value;
  final String label;
}

enum ContactMessageType {
  technicalSupport(0, 'Техникийн тусламж'),
  businessPartnership(1, 'Бизнес хамтрал'),
  selling(2, 'Зар оруулах'),
  buying(3, 'Худалдан авах'),
  account(4, 'Бүртгэл'),
  feedback(5, 'Санал хүсэлт');

  const ContactMessageType(this.value, this.label);

  final int value;
  final String label;
}
