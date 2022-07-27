# coding:utf-8
from bs4 import BeautifulSoup


def make_bookmark(html):
    soup = BeautifulSoup(html, "lxml")
    all_dl = soup.find("dl")
    all_title = soup.find_all('h3')
    try:
        all_item_dl = all_dl.find_all("dl")
    except:
        return {
            "msg": "提交的书签数据不合法，请导入高版本的 Chrome / Edge 书签",
            "suc": False
        }
    items_list = []
    for i in all_item_dl:
        title = i.find_all("h3")
        items = i.find_all("dt")
        item_list = []
        for l in items:
            item = l.find("a")
            if item:
                item_list.append(item)
                pass
        items_list.append(item_list)
    data = {
        'suc': True,
        'len': len(items_list[0])
    }
    data_final = []
    for i in range(len(all_title)):
        if i != 0:
            list_title = all_title[i].text
            shuqian_list = []
            for l in items_list[i]:
                try:
                    icon = l["icon"]
                    href = l["href"]
                    items_title = l.text
                    item_data = {
                        "icon": icon,
                        "href": href,
                        "item_title": items_title
                    }
                    shuqian_list.append(item_data)
                except KeyError:
                    pass
            data_final.append(
                {
                    "title": list_title,
                    "items": shuqian_list
                }
            )
    data["data"] = data_final
    # 根据 data 里面的数据长度进行排序
    data_final.sort(key=lambda x: len(x["items"]), reverse=True)
    return data

    