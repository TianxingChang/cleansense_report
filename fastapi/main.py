from bson import json_util
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json


app = FastAPI()
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------- MongoDB connection info ----------- #
uri = "mongodb+srv://terry:Createx032024@cleansensecluster.mdrztnb.mongodb.net/?retryWrites=true&w=majority"
mongo_client = MongoClient(uri, server_api=ServerApi('1'))

dis= [[0,1,2,3,4,5],[1,0,1,4,3,4],[2, 1, 0, 5, 4, 3],[4, 5, 6, 0, 1, 2],[4, 3, 4, 1, 0, 1],[5, 4, 3, 2, 1, 0]]


@app.get("/")
async def root():
    return {"message": "Hello World"}


# @app.get("/hello/{name}")
# async def say_hello(name: str):
#     return {"message": f"Hello {name}"}


@app.get("/current")
async def current_data():
    current_db = mongo_client["test"]
    current_collection = current_db["current"]
    cursor = current_collection.find({})
    returned_list = []
    for document in cursor:
        returned_list.append(document)
    returned_json = json_util.dumps(returned_list)
    return json.loads(returned_json)

# @app.get("/job")
# async def job():

@app.get("/user/{id}")
async def toilet_list(id):
    current_db = mongo_client["Demo"]
    current_collection = current_db["current"]
    cursor = current_collection.find({})
    returned_list = []
    for document in cursor:
        returned_list.append(document)
    # returned_json = json_util.dumps(returned_list)
    waiting_time = [0]*6
    tid_list = []
    for item in returned_list:
        t_name = item["toilet"]
        if t_name == "G-a":
            tid = 1
        elif t_name == "G-b":
            tid = 2
        elif t_name == "LG1-a":
            tid = 3
        elif t_name == "LG1-b":
            tid = 4
        elif t_name == "LG4-a":
            tid = 5
        elif t_name == "LG4-b":
            tid = 6
        else:
            tid = -1
        tid_list.append(tid)
        avail_num = item["avail_num"]
        people_in = item["people_in"]
        if avail_num > 0:
            waiting_time[tid-1] = 0
        else:
            waiting_time[tid-1] = 3+(people_in//3) * 3 if (people_in-3) > 0 else 0
    for x in range(6):
        waiting_time[x] += dis[int(id)-1][x]
    # print(tid_list)

    result = [[x.get("toilet"), {"cub": x.get("avail_num"), "people": x.get("people_in"), "hygiene": x.get("cubicle")[0][0]+x.get("cubicle")[1][0]+x.get("cubicle")[2][0]}] for _, x in sorted(zip(tid_list, returned_list), key=lambda x:x[0])]
    print(result)

    # final_result = [x for _,x in sorted(zip(waiting_time, result), key=lambda x:x[0])]
    result_match_id = list(zip(waiting_time, result))
    result_match_id.sort(key=lambda x:x[0])
    return_json = json_util.dumps(result_match_id)

    return json.loads(return_json)

@app.get("/cleaning_list")
async def get_clean_list():
    current_db = mongo_client["Demo"]
    current_collection = current_db["current"]
    cursor = current_collection.find({})
    returned_list = []
    for document in cursor:
        returned_list.append(document)

    task_list = [] # priority
    cub_list=dict()
    for item in returned_list:
        t_name = item["toilet"]
        if t_name == "G-a":
            tid = 1
        elif t_name == "G-b":
            tid = 2
        elif t_name == "LG1-a":
            tid = 3
        elif t_name == "LG1-b":
            tid = 4
        elif t_name == "LG4-a":
            tid = 5
        elif t_name == "LG4-b":
            tid = 6
        else:
            tid = -1

        avail_num = item["avail_num"]
        people_in = item["people_in"]
        cubicles = item["cubicle"]
        single_toilet = []
        total = 0
        for i in range(3):
            new = cubicles[i][0]
            if new>3:
                single_toilet.append("cubicle"+str(i))
            total += new
        cub_list[t_name] = single_toilet

        task_list.append(total)
    print(task_list)
    result = [[x[1].get("toilet"), *cub_list[x[1].get("toilet")]] for x in sorted(zip(task_list, returned_list), key=lambda x:x[0], reverse=True)]

    return_json = json_util.dumps(result)
    return json.loads(return_json)


@app.get("/display")
async def get_display():
    current_db = mongo_client["Demo"]
    current_collection = current_db["current"]
    cursor = current_collection.find({})
    returned_list = []
    for document in cursor:
        returned_list.append(document)
    for item in returned_list:
        t_name = item["toilet"]
        if t_name == "LG1-b":
            return_list = []





