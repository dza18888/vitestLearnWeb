const t={title:"用例编写",content:[{title:"断言",value:"asserttion",content:[{type:"text",content:"现在要测试如下这个函数："},{type:"codeBlock",language:"javascript",content:`function sum(a, b) {
  return a + b
}`},{type:"text",content:"比如输入 1 和 2，这个函数会输出 3。然后要让这个函数跑起来，传入 1 和 2，打印函数返回值看看是否为 3。于是可以写出以下这段测试代码："},{type:"codeBlock",language:"javascript",content:"console.log(sum(1, 2))"},{type:"text",content:"然后运行这段代码，检查打印结果是否为 3。这样，一个测试代码就完成了。当然，这个函数过于简单。而且，这段代码运行起来还需要人工观察运行结果来检验测试，这其实不属于自动化测试的范畴。"},{type:"text",content:"当类似的测试做多了之后我们就可以发现一个规律，大多数测试用例，都是设计一个或多个输入数据，以及对应的输出数据，通过传入这些输入数据时被测代码是否产生或返回这些输出数据来判断被测代码是否运行正常，这个判断的过程就叫作<b>断言（assertion）</b>。"},{type:"text",content:"Node 的 assert 模块就提供了进行断言的 API，比如使用 equal 方法对上述的 sum 函数进行断言"},{type:"codeBlock",language:"javascript",content:"assert.equal(sum(1, 2), 3)"},{type:"text",content:"运行这段代码，如果 sum 函数的实现不符合预期，equal 方法就会抛出一个 <code>AssertionError</code> 错误，并打印详细的错误原因。"},{type:"text",content:"<b>Vitest中的断言</b>",style:"margin: 20px 0"},{type:"text",content:"Vitest 的 断言方法 与 Jest 的 expect 用法基本一致，直接调用一个方法进行断言："},{type:"codeBlock",language:"javascript",content:`expect(2 + 2).toBe(4)
expect('How time flies').toContain('time')
expect({a: 1}).not.toEqual({b: 2})`},{type:"text",content:"如上例所示，像 <code>toBe()</code>、<code>toEqual()</code>这类对待测内容的某个方面进行断言的方法，称为匹配器（Matcher）。 详见：<a>Vitest匹配器</a>"}]},{title:"test()",value:"test",content:[{type:"text",content:"<code>test()</code> 方法，用于声明一个测试用例。我们在写单元测试时基本上就是以测试用例为单位来组织测试。"},{type:"text",content:'它的第一个参数接受一个字符串，用于描述这个测试用例的内容，一般用"xx should xx"，这样可以清晰地表明这个测试用例的意图。'},{type:"text",content:"第二个参数是一个函数，包含了这个测试用例的主体内容，即断言。<b>一个测试用例可以包含多个断言</b>，但是所断言的内容应该符合这个测试用例的意图。"},{type:"text",content:"另外，该方法还有一个别名：<code>it()</code>"},{type:"codeBlock",language:"javascript",content:`test("should return the sum result", () => {
  expect(sum(1, 2)).toBe(3)
  expect(sum(2, 4)).toBe(6)
  expect(sum(10, 100)).toBe(110)
})`}]},{title:"describe()",value:"describe",content:[{type:"text",content:"<code>describe()</code> 方法可以组织一个或多个测试用例，将多个相关的测试组合成一个块，这种块叫作测试套件（test suite）。使用 describe 来组织测试用例是一个推荐的写法，可以将测试内容与其他内容隔离，更有利于维护。"},{type:"text",content:"另外，<code>describe()</code> 方法可以嵌套使用。"},{type:"codeBlock",language:"javascript",content:`describe('test.js', () => {
  describe('function name', () => {
    test('should return the sum result', () => {
      expect(sum(1, 2)).toBe(3);
    });
  });
});`}]},{title:"匹配器 (Matcher)",value:"matcher",content:[{type:"text",content:'Vitest使用匹配器 (Matcher)的机制让你可以使用各种方法进行测试。这里向你介绍一些常用的匹配器，全部匹配器可查看：<a href="https://cn.vitest.dev/api/expect.html" target="_blank">Vitest expect</a>'}],children:[{title:"toBe",value:"toBe",content:[{type:"text",content:"<code>toBe</code> 可用于断言是否相等或对象共享相同的引用。它相当于调用 <code>expect(Object.is(variable, variable)).toBe(true)</code>"},{type:"codeBlock",language:"javascript",content:`import { deepCopy } from "@/utils/utils.js";

describe("utils.js", () => {
  describe("test toBe", () => {
    test("should be same reference", () => {
      expect(1 + 1).toBe(2);
      // expect(2).toBe("2");  expected 2 to be '2'

      expect(NaN).toBe(NaN);
      // expect(NaN === NaN).toBe(true); expected false to be true

      expect(0).toBe(+0);
      // expect(-0).toBe(0); expected -0 to be +0

      // expect(0.1 + 0.2).toBe(0.3); expected 0.30000000000000004 to be 0.3

      const obj = {
        insideObj: {},
      };
      const cloneObj = { ...obj };
      expect(obj.insideObj).toBe(cloneObj.insideObj);
    });
  })
  describe("deepCopy", () => {
    test("cloned obj should not be old obj", () => {
      const testObj = {
        arr: [
          {
            insideObj: "test",
          },
        ],
      };
      const deepClonedObj = deepCopy(testObj);
      expect(deepClonedObj.arr).not.toBe(testObj.arr);
    });
  });
});`}]},{title:"toEqual",value:"toEqual",content:[{type:"text",content:"<code>toEqual</code> 断言实际值是否等于接收到的值，如果它是一个对象，则断言是否具有相同的结构（递归进行比较）。"},{type:"codeBlock",language:"javascript",content:`import { deepCopy } from "@/utils/utils.js";

describe("utils.js", () => {
  describe("deepCopy", () => {
    test("cloned obj should not be equal to old obj", () => {
      const testObj = {
        arr: [
          {
            insideObj: "test",
          },
        ],
      };
      const testObj2 = {
        arr: [
          {
            insideObj: "test2",
          },
        ],
      }
      const deepClonedObj = deepCopy(testObj);
      expect(deepClonedObj).toEqual(testObj);
      // expect(testObj).toEqual(testObj2); 
      // expected { arr: [ { insideObj: 'test' } ] } to deeply equal { arr: [ { insideObj: 'test2' } ] }
    });

    test('obj1 should be equal to obj2', () => {
      const testObj1 = {
        insideObj: {
          test1: '1',
          test2: undefined,
        }
      };
      const testObj2 = {
        insideObj: {
          test1: '1',
        }
      };
      expect(testObj1).toEqual(testObj2); // 使用toStrictEqual用例将失败
    })
  });
});`}]},{title:"not",value:"not",content:[{type:"text",content:"使用 <code>not</code> 将否定断言。"},{type:"codeBlock",language:"javascript",content:`let input = Math.sqrt(16);

expect(input).toBe(4);
expect(input).not.toBe(2);`}]},{title:"toContain",value:"toContain",content:[{type:"text",content:"<code>toContain</code> 断言实际值是否在数组中。<code>toContain</code> 还可以检查一个字符串是否是另一个字符串的子串。"},{type:"codeBlock",language:"javascript",content:`describe("toContain", () => {
  test("item should be contained in arr", () => {
    const arr = ["apple", "orange", "juice"];
    expect(arr).toContain("apple");

    const arr2 = [
      {
        value: '1'
      }
    ]
    let obj = {
      value: '1'
    }
    let obj2 = arr2[0]

    expect(arr2).not.toContain(obj); // 若需要内部判断相等，需要使用toContainEqual
    expect(arr2).toContain(obj2);
  });

  test("strSlice should be contained in str", () => {
    let str = 'abcdefg'
    expect(str).toContain('abc');
  })
});`}]},{title:"tothrowError",value:"tothrowError",content:[{type:"text",content:"<code>toThrowError</code> 断言函数在被调用时是否会抛出错误。"},{type:"text",content:"我们可以提供一个可选参数来测试是否抛出了特定的错误："},{type:"list",content:["正则表达式 (regular expression) ：错误消息与模式匹配","字符串 (string) ：错误消息包含子字符串"]},{type:"tip",content:"必须将代码包装在一个函数中，否则错误将无法被捕获，测试将失败。"},{type:"tip",content:"要测试异步函数，请与 rejects 结合使用。"},{type:"codeBlock",language:"javascript",content:`describe("toThrowError", () => {
  function throwError(syncOrAsync) {
    if (syncOrAsync === "async") {
      return Promise.reject(new Error("orange"));
    } else {
      throw new Error("apple");
    }
  }
  
  test("func should throw error", async () => {
    // expect(throwError()).toThrowError() Error: error
    expect(throwError).toThrowError();
    expect(() => throwError("sync")).toThrowError("apple");

    await expect(() => throwError('async')).rejects.toThrowError(/ora/)
  });
});`}]},{title:"toHaveBeenCalled",value:"toHaveBeenCalled",content:[{type:"text",content:"这个断言对于测试函数是否被调用很有用。需要将一个 <code>spy</code> 函数传递给 expect。"},{type:"codeBlock",language:"javascript",content:`describe("toHaveBeenCalled", () => {
  const obj = {
    testFunc() {},
  };
  test("func should be called", () => {
    const func = vi.spyOn(obj, "testFunc");

    expect(func).not.toHaveBeenCalled();

    obj.testFunc();

    expect(func).toHaveBeenCalled();
  });
  test("vi func should be called", () => {
    const func = vi.fn();

    // console.log(func); [Function: spy]
    func();

    expect(func).toHaveBeenCalled();
  });
});`}]},{title:"toHaveBeenCalledTimes",value:"toHaveBeenCalledTimes",content:[{type:"text",content:"这个断言检查函数被调用的次数是否达到特定次数。需要将一个 <code>spy</code> 函数传递给 expect。"},{type:"codeBlock",language:"javascript",content:`import { debounce } from "@/utils/utils.js";

describe("toHaveBeenCalledTimes", () => {
  const callback = vi.fn();
  test("func should be called", async () => {
    const debounceFunc = debounce(callback, 100);

    vi.useFakeTimers();
    debounceFunc();
    debounceFunc();
    debounceFunc();
    vi.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(1);

    vi.clearAllMocks(); // 清除spy调用历史记录
    debounceFunc();
    vi.advanceTimersByTime(100);
    debounceFunc();
    vi.advanceTimersByTime(100);
    vi.useRealTimers()
    expect(callback).toHaveBeenCalledTimes(2);
  });
});`}]}]},{title:"vi",value:"vi",content:[{type:"text",content:"可提供测试使用功能的 vi 辅助工具。可以全局访问（启用 globals 配置），也可以直接从 vitest 中导入："},{type:"codeBlock",language:"javascript",content:"import { vi } from 'vitest'"}],children:[{title:"vi.mock",value:"viMock",content:[{type:"text",content:"用另一个模块替换提供的 path 中的所有导入模块。对 vi.mock 的调用是悬挂式的，因此在何处调用并不重要。它总是在所有导入之前执行。"},{type:"tip",content:"vi.mock 仅对使用 import 关键字导入的模块有效。它对 require 无效。"},{type:"tip",content:'若需要获取原始module，则使用importOriginal，用async/await接收。<a href="https://segmentfault.com/q/1010000044201309" target="_blank">ESM 的“异步”到底异步在哪里？ 为什么import的模块都是同步执行，却说ESM是异步的？</a>'},{type:"codeBlock",language:"javascript",content:`import { RGBAtoRGB } from "@/utils/utils.js";

describe("vi.mock", () => {
  test("module should be mocked", () => {
    expect(RGBAtoRGB()).toBe('mockRes')

    vi.mock("@/utils/utils.js", async (importOriginal) => {
      const mod = await importOriginal(); // 导入原始module
      return {
        ...mod,
        RGBAtoRGB: vi.fn(() => 'mockRes'),
      };
    });
  });
});`},{type:"tip",content:"如果我们模拟的模块有默认导出，则需要在返回的工厂函数对象中提供一个 default 键。"},{type:"codeBlock",language:"javascript",content:`import testMock from "@/utils/testMock.js";

test("default module should be mocked", () => {
  vi.mock("@/utils/testMock.js", () => {
    return {
      default: {
        testMock: "test",
      },
    };
  });
  expect(testMock).toEqual({
    testMock: "test",
  });
});`}]},{title:"vi.fn",value:"viFn",content:[{type:"text",content:"创建函数的监视程序。每次调用函数时，它都会存储调用参数、返回值和实例。如果没有给出函数，调用时将返回 undefined。"},{type:"tip",content:"一般可用作callback函数。"},{type:"codeBlock",language:"javascript",content:`describe("vi.fn", () => {
  test("vi.fn should be called", () => {
    let mock = vi.fn();
    mock();
    expect(mock).toHaveBeenCalled();
  });
});`}]},{title:"vi.spyOn",value:"viSpyon",content:[{type:"text",content:"创建与 <code>vi.fn()</code> 类似的对象的方法或 getter/setter 的监听(spy) 。它会返回一个 mock 函数 。"},{type:"tip",content:"一般可用在断言某一函数是否被调用。"},{type:"codeBlock",language:"javascript",content:`describe("vi.spyOn", () => {
  test("spyOn func should be called", () => {
    let obj = {
      getInfo: () => 'info'
    }
    let func = vi.spyOn(obj, 'getInfo');
    obj.getInfo()
    expect(func).toHaveBeenCalled();
  });
});`},{type:"codeBlock",language:"javascript",content:`import * as functionObj from './test.js'
test("spyOn func should be called", () => {
  let func = vi.spyOn(functionObj, 'getInfo');
  functionObj.getInfo()
  expect(func).toHaveBeenCalled();
});`}]},{title:"vi.useFakeTimers",value:"viUseFakeTimers",content:[{type:"text",content:"要启用模拟定时器，调用此方法。它将取代以下原始计时器函数的实现。（ <code>setTimeout</code> 、<code>setInterval</code> 、<code>clearTimeout</code> 、<code>clearInterval</code> 、<code>setImmediate</code> 、<code>clearImmediate</code> 和 <code>Date</code>）"},{type:"text",content:"使用<code>vi.useFakeTimers</code>的意义："},{type:"text",content:"原生的计时器函数不是很方便测试，因为程序需要等待相应的延时。 Vitest可以通过一个函数转换计时器以便允许你控制时间。若测试用例当中含有较多需要异步等待的用例，使用Fake Time将会节省大量执行用例的时间。"},{type:"codeBlock",language:"javascript",content:`describe("vi.useFakeTimers", () => {
  test("time should be faked", async () => {
    let count = 0;
    vi.useFakeTimers();
    let time = setInterval(() => {
      count++;
      if (count === 5) {
        clearInterval(time);
      }
    }, 500);
    vi.advanceTimersByTime(3000);
    vi.useRealTimers();
    expect(count).toBe(5);
  });
});`},{type:"img",content:"useFakeTime.png",style:"width:40%"},{type:"text",content:"若不使用Fake Time，用例执行可能会花费更长的时间："},{type:"codeBlock",language:"javascript",content:`describe("vi.useFakeTimers", () => {
  test("time should be faked", async () => {
    let count = 0;
    let time = setInterval(() => {
      count++;
      if (count === 5) {
        clearInterval(time);
      }
    }, 500);
    await new Promise((resolve,reject) => {
      setTimeout(() => {
        resolve()
      }, 3000);
    })
    expect(count).toBe(5);
  });
});`},{type:"img",content:"useRealTime.png",style:"width:40%"}]},{title:"vi.advanceTimersByTime",value:"viAdvanceTimersByTime",content:[{type:"text",content:"通过调用这个API， 所有计时器都将以毫秒增长。所有处于任务队列等待中的宏任务都将被执行。"},{type:"codeBlock",language:"javascript",content:`describe("vi.advanceTimersByTime", () => {
  test("time should be faked", async () => {
    function callAfterOneSecond(callback) {
      setTimeout(() => {
        callback && callback();
      }, 2000);
    }
    const func = vi.fn();
    vi.useFakeTimers()
    callAfterOneSecond(func);

    expect(func).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(2000);
    expect(func).toHaveBeenCalled();
  });
});`}]}]},{title:"组件测试",value:"component-test",content:[{type:"text",content:"前面介绍了Vitest相关基础语法。但要完成vue工程的单元测试，还需要有对组件进行测试的方法。"},{type:"text",content:'在vue项目中，若使用的风格是<a href="https://vuejs.org/guide/introduction.html#api-styles" target="_blank">选项式API</a>，则支持直接引入该组件暴露出的对象，获取其中的方法。'},{type:"codeBlock",language:"vue",content:`<script>
export default {
  data() {
    return {
      test: "",
    };
  },
  methods: {
    changeTest(value) {
      this.test = value;
    },
  },
};
<\/script>`},{type:"codeBlock",language:"javascript",content:`import OptionsApi from "@/components/OptionsApi.vue";

describe("OptionsApi", () => {
  describe("changeTest", () => {
    test("test should be changed", () => {
      const mockData = {
        test: "",
      };
      OptionsApi.methods.changeTest.call(mockData, "res");
      expect(mockData.test).toBe("res");
    });
  });
});`},{type:"text",content:"该测试组件方法的局限性："},{type:"list",content:["无法直接使用组件实例中的属性、computed、watch等功能，所有属性和方法都必须mock","测试组件内的方法涉及指向vue实例的this，都需要改变this指向","无法进行模拟DOM交互","组合式API无法使用该方法进行测试"]}]},{title:"vue-test-utils",value:"vue-test-utils",content:[{type:"text",content:"Vue Test Utils 是 Vue.js 官方的单元测试实用工具库。可用于vue组件测试。"},{type:"text",content:"首先进行安装"},{type:"codeBlock",language:"bash",content:"npm install -D @vue/test-utils"},{type:"text",content:"基础用法"},{type:"codeBlock",language:"javascript",content:`import { mount } from '@vue/test-utils'

const Component = {
  template: '<div>Hello world</div>'
}

test('mounts a component', () => {
  const wrapper = mount(Component, {})

  expect(wrapper.html()).toContain('Hello world')
})`}],children:[{title:"mount",value:"mount",content:[{type:"text",content:"用于渲染vue组件，并将挂载后的组件赋值给包裹器<code>wrapper</code>"},{type:"text",content:"其中 <code>wrapper</code> 是一个对象，该对象包含了一个挂载的组件或 vnode，以及测试该组件或 vnode 的方法。"},{type:"codeBlock",language:"vue",content:`<template>
  <div class="test-component">
    <div class="desc-text">Vitest前端测试用例编写经验分享</div>
    <Wave v-model="waveShow">
      <Documentation></Documentation>
    </Wave>
  </div>
</template>

<script setup>
import Wave from "@/components/Wave.vue";
import Documentation from "@/views/Documentation.vue";
import { ref } from "vue";

let waveShow = ref(true);

function goToDocument() {
  waveShow.value = false;
}
<\/script>`},{type:"codeBlock",language:"javascript",content:`import Home from "@/views/Home.vue";
import { mount } from "@vue/test-utils";

describe("Home", () => {
  test("html should contain some words", () => {
    vi.mock("vue-router", async (importOriginal) => {
      const actual = await importOriginal();
      return {
        ...actual,
        useRoute: vi.fn(() => {
          return {
            name: "testName",
          };
        }),
      };
    });
    const wrapper = mount(Home);
    expect(wrapper.text()).toContain("Vitest前端测试用例编写经验分享");
  });
});`}]},{title:"wrapper.vm",value:"wrapperVm",content:[{type:"text",content:"<code>wrapper.vm</code> 为组件vue实例。你可以通过 <code>wrapper.vm</code> 访问一个实例所有的方法和属性。"},{type:"codeBlock",language:"javascript",content:`test("waveShow should be changed", () => {
  const wrapper = mount(TestComponent);
  wrapper.vm.goToDocument()
  expect(wrapper.vm.waveShow).toBe(false);
});`}]},{title:"wrapper.emitted()",value:"wrapperEmitted",content:[{type:"text",content:"返回一个包含所有触发的自定义事件的对象。"},{type:"tip",content:"可用于断言事件是否发送"},{type:"codeBlock",language:"vue",content:`<script setup>
const emit = defineEmits(["fireEvent"]);

function fireEvent(params) {
  emit("fireEvent", params);
}
<\/script>`},{type:"codeBlock",language:"javascript",content:`test("event should be emitted", () => {
  const wrapper = mount(TestComponent);
  wrapper.vm.fireEvent("param1");
  expect(wrapper.emitted().fireEvent[0]).toEqual(["param1"]);
  wrapper.vm.fireEvent("param2");
  expect(wrapper.emitted().fireEvent.length).toBe(2); // { fireEvent: [["param1"], ["param2"]] }
});`}]},{title:"wrapper.text()",value:"wrapperText",content:[{type:"text",content:"返回wrapper的文本内容，将所有的innerText合并并返回"},{type:"codeBlock",language:"html",content:`<template>
  <div class="test-component">
    <div class="text">vitest</div>
    <div class="text">frontend</div>
    <div class="text">testcase</div>
  </div>
</template>`},{type:"codeBlock",language:"javascript",content:`test("wrapper text should contain vitest", () => {
  const wrapper = mount(TestComponent);
  console.log(wrapper.text()); // vitestfrontendtestcase
  expect(wrapper.text()).toContain('vitest')
});`}]},{title:"wrapper.html()",value:"wrapperHtml",content:[{type:"text",content:"返回 Wrapper DOM 节点的 HTML 字符串。"},{type:"codeBlock",language:"javascript",content:`test("wrapper text should contain vitest", () => {
  const wrapper = mount(TestComponent);
  console.log(wrapper.html());
  /* <div class="test-component">
       <div class="text">vitest</div>
       <div class="text">frontend</div>
       <div class="text">testcase</div>
     </div> */
  expect(wrapper.html()).toContain('<div class="text">vitest</div>')
});`}]},{title:"wrapper.setData",value:"wrapperSetData",content:[{type:"text",content:"设置 Wrapper vm 的属性。"},{type:"codeBlock",language:"javascript",content:`<script>
export default {
  data() {
    return {
      test: "",
    };
  },
};
<\/script>`},{type:"codeBlock",language:"javascript",content:`describe("setData", () => {
  test("data should be changed", async () => {
    const wrapper = mount(OptionsApi)
    await wrapper.setData({
      test: 'abc'
    })
    expect(wrapper.vm.test).toBe("abc");
  });
});`},{type:"tip",content:"若使用组合式API，无法使用setData，无法修改setup中的数据"}]},{title:"shallowMount",value:"shallowMount",content:[{type:"text",content:"和 <code>mount</code> 一样，创建一个包含被挂载和渲染的 Vue 组件的 Wrapper，不同的是<b>子组件不会被渲染</b>。"},{type:"codeBlock",language:"vue",content:`<template>
  <div class="test-component">
    <div class="desc-text">Vitest前端测试用例编写经验分享</div>
    <Wave v-model="waveShow">
      <Documentation></Documentation>
    </Wave>
  </div>
</template>

<script setup>
import Wave from "@/components/Wave.vue";
import Documentation from "@/views/Documentation.vue";
import { ref } from "vue";

let waveShow = ref(true);

function goToDocument() {
  waveShow.value = false;
}
<\/script>`},{type:"text",content:"shallowMount:"},{type:"codeBlock",language:"javascript",content:`test("wrapper text should contain vitest", () => {
  const wrapper = shallowMount(TestComponent);
  console.log(wrapper.html());
  /* <div class="test-component">
       <div class="desc-text">Vitest前端测试用例编写经验分享</div>
       <wave-stub modelvalue="true"></wave-stub>
     </div>*/
});`},{type:"text",content:"mount:"},{type:"codeBlock",language:"javascript",content:`test("wrapper text should contain vitest", () => {
  const wrapper = mount(TestComponent);
  console.log(wrapper.html());
  /* <div class="test-component">
      <div class="desc-text">Vitest前端测试用例编写经验分享</div>
      <div data-v-ca50619c="" class="hero_area">
        <div data-v-ca50619c="" class="content-area" style="top: 100vh; background-color: 
    rgb(80, 110, 16);">
          <div data-v-5b0fc2a0="" class="Documentation">
            <div data-v-c970699f="" data-v-5b0fc2a0="" class="Header">
              <div data-v-c970699f="" class="left-placement"></div>
              <div data-v-c970699f="" class="menu-list">
                <div data-v-c970699f="" class="menu-item">Vitest简介</div>
                <div data-v-c970699f="" class="menu-item">用例执行与调试</div>
                <div data-v-c970699f="" class="menu-item">用例编写</div>
                <div data-v-c970699f="" class="menu-item">vue-test-utils</div>
                <div data-v-c970699f="" class="menu-item">其他</div>
              </div>
              <div data-v-c970699f="" class="right-buttons">
                <div data-v-c970699f="" class="change-color">
                  <div data-v-c970699f="" class="icon-paint-format"></div>
                  <!--v-if-->
                </div>
              </div>
            </div>
            <div data-v-5b0fc2a0="" class="documentation-content">
              <router-view data-v-5b0fc2a0=""></router-view>
            </div>
          </div>
        </div>
      </div>
    </div> */
});`},{type:"text",content:"由此可以看出，使用mount会将组件内包含的子组件全部渲染出来，组件层级越深，渲染的花销和不确定性就越大，因此，建议渲染组件时以使用<code>shallowMount</code>为主。"},{type:"tip",content:"在测试用例中，我们通常希望专注在一个孤立的单元中测试组件，避免对其子组件的行为进行间接的断言。额外的，对于包含许多子组件的组件来说，整个渲染树可能会非常大。重复渲染所有的子组件可能会让我们的测试变慢。"}]}]},{title:"挂载选项",value:"mountOptions",content:[{type:"text",content:"包括 <code>mount</code> 和 <code>shallowMount</code> 的可供传递的选项。"}],children:[{title:"data",value:"data",content:[{type:"text",content:"向一个组件传入数据。这将会合并到现有的 data 函数中。"},{type:"codeBlock",language:"vue",content:`<script>
export default {
  data() {
    return {
      test: "",
    };
  },
  methods: {
    changeTest(value) {
      this.test = value;
    },
  },
};
<\/script>`},{type:"codeBlock",language:"javascript",content:`test("test data should be changed", async () => {
  const wrapper = shallowMount(OptionsApi, {
    data() {
      return {
        test: '123'
      }
    },
  })
  expect(wrapper.vm.test).toBe("123");
});`},{type:"tip",content:"无法修改组合式API中setup中的数据"}]},{title:"props",value:"props",content:[{type:"text",content:"在组件被挂载时设置组件实例的 prop。"},{type:"codeBlock",language:"javascript",content:`describe("optionData", () => {
  test("test prop should be changed", async () => {
    const wrapper = shallowMount(OptionsApi, {
      props: {
        testProp: 'abcd'
      }
    })
    expect(wrapper.vm.testProp).toBe('abcd');
  });
});`},{type:"tip",content:"组合式API也支持该参数"},{type:"codeBlock",language:"vue",content:`<script setup>
import { ref, watch } from "vue";

let propMockSuccess = false;
const { testProp } = defineProps({
  testProp: {
    type: String,
    default: "",
  },
});

watch(
  () => props.testProp,
  (newVal) => {
    if (newVal === "res") {
      propMockSuccess = true;
    }
  },
  { immediate: true }
);
<\/script>`},{type:"codeBlock",language:"javascript",content:`test("prop data should changed", async () => {
  const wrapper = shallowMount(TestComponent, {
    props: {
      testProp:'res'
    },
  });
  expect(wrapper.vm.propMockSuccess).toBe(true);
});`}]},{title:"slots",value:"slots",content:[{type:"text",content:"为组件提供一个 slot 内容的对象。该对象中的键名就是相应的 slot 名，键值可以是一个组件、一个组件数组、一个字符串模板或文本。"},{type:"codeBlock",language:"vue",content:`<template>
  <div class="test-component">
    <div class="desc-text">Vitest前端测试用例编写经验分享</div>
    <slot name="specificSlot"></slot>
    <slot></slot>
  </div>
</template>`},{type:"codeBlock",language:"javascript",content:`test("slots should be inserted", async () => {
  const wrapper = mount(TestComponent, {
    slots: {
      default: "default text",
      specificSlot: h("h1", {}, "Named Slot"),
    },
  });
  expect(wrapper.html()).toContain('<h1>Named Slot</h1>default text');
});`}]},{title:"global.directives",value:"globalDirectives",content:[{type:"text",content:"向挂载的组件全局注册指令。"},{type:"codeBlock",language:"javascript",content:`import { mount } from '@vue/test-utils'
import Directive from '@/directives/Directive'

const Component = {
  template: '<div v-bar>Foo</div>'
}

test('global.directives', () => {
  const wrapper = mount(Component, {
    global: {
      directives: {
        Bar: Directive // Bar matches v-bar
      }
    }
  })
})`}]},{title:"global.mixins",value:"globalMixins",content:[{type:"text",content:"向挂载的组件全局注册Mixin。"},{type:"codeBlock",language:"javascript",content:`import { mount } from '@vue/test-utils'
import Component from './Component.vue'
import ComponentMixin from './ComponentMixin.js'

test('global.mixins', () => {
  const wrapper = mount(Component, {
    global: {
      mixins: [ComponentMixin]
    }
  })
})`}]},{title:"global.mocks",value:"globalMocks",content:[{type:"text",content:"mock一个全局的实例属性。一般可用于mock <code>this.$store</code> <code>this.$router</code>等"},{type:"codeBlock",language:"vue",content:`<template>
  <button @click="onClick" />
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$store.dispatch('click')
    }
  }
}
<\/script>`},{type:"codeBlock",language:"javascript",content:`import { mount } from '@vue/test-utils'
import Component from './Component.vue'

test('global.mocks', async () => {
  const $store = {
    dispatch: vi.fn()
  }

  const wrapper = mount(Component, {
    global: {
      mocks: {
        $store
      }
    }
  })

  await wrapper.find('button').trigger('click')

  expect($store.dispatch).toHaveBeenCalledWith('click')
})`}]},{title:"global.plugins",value:"globalPlugins",content:[{type:"text",content:"向挂载的组件安装插件。"},{type:"tip",content:"常用于挂载第三方组件，如element-plus"},{type:"codeBlock",language:"javascript",content:`import elementPlus from 'element-plus';

test("elementPlus should be rendered", async () => {
  const wrapper = mount(TestComponent, {
    global: {
      plugins: [elementPlus],
    },
  });
  console.log(wrapper.html());
});`}]}]},{title:"测试技巧",value:"testSkill",children:[{title:"测试异步函数",value:"testAsyncFunc",content:[{type:"text",content:"jest 当中，用例支持传递一个 done 参数，jest会等done回调函数被调用执行结束后，再结束测试。"},{type:"codeBlock",language:"javascript",content:`test('the data should be peanut butter', done => {
  function fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('peanut butter');
      }, 1000);
    })
  }

  fetchData().then(res => {
    expect(res).toBe('peanut butter');
    done()
  });
});`},{type:"text",content:"但在Vitest中不允许这么做，从 Vitest v0.10.0 开始，声明测试的回调样式被弃用。官方建议你使用async/await"},{type:"codeBlock",language:"javascript",content:`test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});`}]},{title:"mock接口调用",value:"mockApi",content:[{type:"text",content:"以axios为例，若我们需要模拟接口返回的数据，可以使用Vitest模块mock工具：<code>vi.mock</code>"},{type:"codeBlock",language:"javascript",content:`vi.mock('axios', () => {
  return {
    default: {
      post: vi.fn(),
      get: vi.fn(),
      delete: vi.fn(),
      put: vi.fn(),
      create: vi.fn().mockReturnThis(),
      interceptors: {
        request: {
          use: vi.fn(),
          reject: vi.fn(),
        },
        response: {
          use: vi.fn(),
          reject: vi.fn(),
        },
      },
    },
  };
});`},{type:"text",content:'之后使用 <code>mockResolvedValueOnce</code> 模拟一次接口调用的数据：<a href="https://cn.vitest.dev/api/mock.html#mockResolvedValueOnce" target="_blank">mockResolvedValueOnce</a>'},{type:"codeBlock",language:"javascript",content:`mocks.get.mockResolvedValueOnce({
  data: {},
});`},{type:"text",content:'这里推荐一个比较好用的接口mock管理工具：<a href="https://www.npmjs.com/package/axios-mock-adapter?activeTab=readme" target="_blank">axios-mock-adapter</a>'},{type:"codeBlock",language:"javascript",content:`import axios from 'axios';
import MockAdapter = from 'axios-mock-adapter';

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet("/users").reply(200, {
  users: [{ id: 1, name: "John Smith" }],
});`},{type:"text",content:"需要注意的是，如果接口mock了参数，调用接口时，传参需要完全一致，否则无法调通。"}]}]},{title:"测试用例编写最佳实践",value:"testCaseBestPractice",content:[{type:"text",content:'<a href="https://blog.logrocket.com/javascript-testing-best-practices/" target="_blank">JavaScript testing: 9 best practices to learn</a>'}],children:[{title:"写好测试注释和描述",value:"writeTestDescription",content:[{type:"text",content:"测试用例和实际业务代码一样，如果没有简介准确的注释，都将使代码难以阅读和维护。"}]},{title:"使用AAA模式编写用例",value:"AaaPattern",content:[{type:"text",content:"AAA模式表示的是Arrange（安排）, Act（行动）, 和 Assert（断言），这是写所有测试用例的必要三步骤，简而言之，即："},{type:"list",content:["准备好mock测试数据","执行待测的代码段","断言预期的结果是否正确"]},{type:"codeBlock",language:"javascript",content:`test('should return max number', () => {
  // Arrange
  let Arr = [1, 10, 5, 9, 8];

  // Act
  let res = getMaxNumber(Arr);
  
  // Assert
  expect(res).toBe(10);
})`},{type:"text",content:"任何一个测试用例都可以套用该模式，当你不知道该如何对一段代码设计测试用例时，可以尝试使用该模式入手。只要记住一点，待测的代码段一定进行了某些操作，结果便是：或改变了某个值，或调用了某个方法。否则该待测的代码将不存在价值。"}]},{title:"使用3-layer模式",value:"useThreeLayer",content:[{type:"text",content:"建议使用三层级模式来编写测试用例："},{type:"list",content:["第1层：要测试的单元，或测试需求","第2层：你想测试的具体行动或场景","第3层：描述预期结果"]},{type:"codeBlock",language:"javascript",content:`describe('utils.js', () => { // 第1层
  describe('formatDate', () => { // 第2层
    test('res date format should match YYYY-MM-DD HH:mm:ss', () => { // 第3层
      
    })
  })
})`}]},{title:"避免在测试中捕捉错误",value:"avoidCatchError",content:[{type:"text",content:"尽可能避免在测试中使用 <code>try...catch</code> 语句，如果你在试图测试的函数的逻辑中存在错误，那有可能导致用例失效。最后测试虽然通过了，但业务逻辑是错误的。"},{type:"text",content:"下面的代码段，addNewProduct表示添加新商品，如果新商品没有传价格，将会报错。现假设addNewProduct函数内部存在逻辑错误，而此时测试用例恰好没有传价格参数，此时会进入到catch当中并调用callback函数。"},{type:"codeBlock",language:"javascript",content:`addNewProduct(productInfo) {
  return new Promise((resolve, reject) => {
    if (productInfo && productInfo.price) {
      resolve("Add success");
    } else {
      this.notExistFunction();
      reject("No product price");
    }
  });
},`},{type:"codeBlock",language:"javascript",content:`describe("addNewProduct", () => {
  test("When no product price, it should throws error", async () => {
    let errorCallback = vi.fn();
    try {
      const result = await testMock.addNewProduct({ name: "rollerblades" });
    } catch {
      errorCallback();
    }
    expect(errorCallback).toHaveBeenCalled();
  });
});`}]},{title:"不要mock所有东西",value:"donotMockAll",content:[{type:"text",content:"当你mock大量的数据、方法时，会极有可能导致用例为无效用例，这样的测试是没有价值的。这里考验每一位开发者对于测试用例编写的掌控能力，能够清楚地判断出哪些用例是必须mock的。"},{type:"text",content:"一般来说，你应该只模拟最底层的依赖关系和I/O操作，比如API数据的调用"}]},{title:"使用真实的数据",value:"useRealData",content:[{type:"text",content:"创建测试数据的时候，尽量还原真实数据，以覆盖尽可能多的分支来检测可能存在的缺陷。"},{type:"text",content:"简而言之，尽量不要使用典型的 <code>foo</code> 字符串来测试你的代码。"}]},{title:"避免测试有太多的断言",value:"avoidTooMuchAssert",content:[{type:"text",content:"不要觉得拆分场景或写更具体的测试描述麻烦。一个测试用例包含五个以上的断言应该视作一条红线，它表明你试图一次性验证太多的东西。"},{type:"text",content:"换句话说，你的测试描述还不够具体。另外，通过编写更具体的测试用例，开发人员在进行代码更新时，也会更容易识别需要修改的测试。"}]}]}]};export{t as G};
