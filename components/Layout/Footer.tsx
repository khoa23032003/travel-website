import Logo from "@/components/Helper/Logo";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-20">
      <div className="w-[90%] xl:w-[80%] mx-auto py-14 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
        {/* Column 1 */}
        <div>
          <Logo />

          <p className="mt-5 text-text-muted text-sm leading-relaxed">
            Khám phá vẻ đẹp Việt Nam qua những hành trình đáng nhớ. MK Travel
            mang đến các điểm đến hấp dẫn, kinh nghiệm du lịch thực tế và những
            trải nghiệm độc đáo trên khắp mọi miền đất nước.
          </p>
        </div>

        {/* Column 2 */}
        <div>
          <h3 className="font-semibold text-lg text-brand-dark mb-6">
            Khám phá
          </h3>

          <ul className="space-y-4 text-sm text-text-muted">
            <li className="hover:text-brand-medium cursor-pointer transition-all">
              Điểm đến nổi bật
            </li>
            <li className="hover:text-brand-medium cursor-pointer transition-all">
              Tour du lịch
            </li>
            <li className="hover:text-brand-medium cursor-pointer transition-all">
              Trải nghiệm
            </li>
            <li className="hover:text-brand-medium cursor-pointer transition-all">
              Ẩm thực địa phương
            </li>
            <li className="hover:text-brand-medium cursor-pointer transition-all">
              Cẩm nang du lịch
            </li>
            <li className="hover:text-brand-medium cursor-pointer transition-all">
              Liên hệ
            </li>
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h3 className="font-semibold text-lg text-brand-dark mb-6">
            Thông tin liên hệ
          </h3>

          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <span className="text-accent-orange text-xl">📍</span>
              <div>
                <p className="text-text-main font-medium">
                  Hồ Chí Minh, Việt Nam
                </p>
                <p className="text-text-muted text-sm">
                  Hỗ trợ khách hàng toàn quốc
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-accent-orange text-xl">📞</span>
              <div>
                <p className="text-text-main font-medium">+84 123 456 789</p>
                <p className="text-text-muted text-sm">
                  08:00 - 22:00 mỗi ngày
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-accent-orange text-xl">✉️</span>
              <div>
                <p className="text-text-main font-medium">
                  contact@mktravel.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 4 */}
        <div>
          <h3 className="font-semibold text-lg text-brand-dark mb-6">
            Kết nối cùng MK Travel
          </h3>

          <p className="text-text-muted text-sm leading-relaxed mb-6">
            Theo dõi chúng tôi để cập nhật các điểm đến mới, kinh nghiệm du lịch
            hữu ích và những ưu đãi hấp dẫn dành cho bạn.
          </p>

          <div className="flex flex-wrap gap-4 text-sm font-medium">
            <span className="cursor-pointer hover:text-brand-medium transition-all">
              Facebook
            </span>

            <span className="cursor-pointer hover:text-brand-medium transition-all">
              Instagram
            </span>

            <span className="cursor-pointer hover:text-brand-medium transition-all">
              TikTok
            </span>

            <span className="cursor-pointer hover:text-brand-medium transition-all">
              YouTube
            </span>
          </div>

          <div className="mt-8">
            <Image
              src="/image/footer.png"
              alt="Logo brand"
              width={220}
              height={100}
              className="h-auto object-contain"
            />
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200">
        <div className="w-[90%] xl:w-[80%] mx-auto py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-muted">
            © 2026 MK Travel. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-text-muted">
            <span className="cursor-pointer hover:text-brand-medium">
              Chính sách bảo mật
            </span>

            <span className="cursor-pointer hover:text-brand-medium">
              Điều khoản sử dụng
            </span>

            <span className="cursor-pointer hover:text-brand-medium">
              Hỗ trợ
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
