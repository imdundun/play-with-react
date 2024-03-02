import Layout from "~/components/Layout";
import tree from "~/assets/tree.svg";
import ScrollSpy from "~/components/ScrollSpy";
import clsx from "~/utils/clsx";
import { useLocation, useNavigate } from "react-router-dom";

interface ScrollSpyConfig {
  value: string;
  buttonClassName: string;
  content: React.ReactNode
}

const items: ScrollSpyConfig[] = [
  {
    value: '1',
    buttonClassName: "md:max-lg:bottom-[7%] left-[0%] bottom-[10%]",
    content: "Content 1"
  },
  {
    value: '2',
    buttonClassName: "md:max-lg:bottom-[7%] right-[0%] bottom-[10%]",
    content: "Content 2"
  },
  {
    value: '3',
    buttonClassName: "md:max-lg:bottom-[21%] left-[6%] bottom-[24%]",
    content: "Content 3"
  },
  {
    value: '4',
    buttonClassName: "md:max-lg:bottom-[21%] right-[6%] bottom-[24%]",
    content: "Content 4"
  },
  {
    value: '5',
    buttonClassName: "md:max-lg:bottom-[36%] left-[13%] bottom-[40%]",
    content: "Content 5"
  },
  {
    value: '6',
    buttonClassName: "md:max-lg:bottom-[36%] right-[13%] bottom-[40%]",
    content: "Content 6"
  },
  {
    value: '7',
    buttonClassName: "md:max-lg:bottom-[48%] left-[21%] bottom-[52%]",
    content: "Content 7"
  },
  {
    value: '8',
    buttonClassName: "md:max-lg:bottom-[48%] right-[21%] bottom-[52%]",
    content: "Content 8"
  },
  {
    value: '9',
    buttonClassName: "md:max-lg:bottom-[61%] left-[28%] bottom-[64%]",
    content: "Content 9"
  },
  {
    value: '10',
    buttonClassName: "md:max-lg:bottom-[61%] right-[28%] bottom-[64%]",
    content: "Content 10"
  },
];

export default function Sample2() {
  const { hash } = useLocation();
  const navigate = useNavigate();

  return (
    <Layout title="Image decoration + Scrollspy">
      <ScrollSpy value={hash.replace('#', '')} onChange={(value) => navigate("#" + value)}>
        <div className="grid grid-cols-12 gap-4">
          <div className="bg-white rounded-xl col-span-12 md:col-span-5 p-4 flex justify-center items-center">
            <span className="relative">
              <img src={tree} />
              {items.map(({ value, buttonClassName }) => (
                <ScrollSpy.Button
                  key={value}
                  value={value}
                  props={(active) => ({
                    className: clsx(
                      "!absolute !rounded-full text-white",
                      buttonClassName,
                      active ? "!bg-amber-800" : "!bg-slate-800"
                    ),
                  })}
                >
                  {value}
                </ScrollSpy.Button>
              ))}
            </span>
          </div>

          <div className="bg-white rounded-xl col-span-12 md:col-span-7 p-4 h-80 overflow-auto">
            {items.map(({ value, content }) => (
              <ScrollSpy.Content
                key={value}
                value={value}
                className='h-96'
              >
                {content}
              </ScrollSpy.Content>
            ))}
          </div>
        </div>
      </ScrollSpy>
    </Layout>
  );
}
