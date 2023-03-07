from lxml import etree
import sys
import json


file_name=sys.argv[1]
output_json=sys.argv[2]


f=open("./"+str(file_name))
tree=etree.parse(f)


output_dict={}


#calculate number of files
f_count=0
for element in tree.xpath("/fsimage/INodeSection/inode[type='FILE']"):
    f_count +=1
    #printf(element)
    
output_dict["number of files"]=f_count


#calculate number of directories
d_count=0
for element in tree.xpath("/fsimage/INodeSection/inode[type='DIRECTORY']"):
    d_count +=1
    #printf(element)
    
output_dict["number of directories"]=d_count


#define and make a tree
class Node(object):
    def __init__(self,name):
        self.name=name
        self.children=[]
    def addChild(self,name):
        self.children.append(Node(name))
        return self
    def addChildrenToParent(self,parent_inum,child_inum):
        queue=[self]
        while len(queue)>0:
            current=queue.pop(0)
            if parent_inum==current.name:
                current.addChild(child_inum)
            else:
                queue.extend(current.children)
#     def deepFirstSearch(self,array=[]):
#         array.append(self.name)
#         for child in self.children:
#             child.deepFirstSearch(array)
#         return array
#     def breadthFirstSearch(self,array=[]):
#         queue=[self]
#         while len(queue)>0:
#             current=queue.pop(0)
#             array.append(current.name)
#             queue.extend(current.children)
#         return array
    def maxDepth(self) -> int:
        d = 1
        for child in self.children:
            d = max(d, child.maxDepth() + 1)
        return d
    

#find and add root node
root_node=tree.xpath("/fsimage/INodeSection/inode[name[not(node())]]")
root_num=root_node[0].xpath("./id/text()")[0]
root_num=int(root_num)
dir_tree=Node(root_num)


#add children nodes to their parent node
for element in tree.xpath("/fsimage/INodeDirectorySection/directory"):
    for i in element.xpath("./parent/text()"):
        parent_inum=int(i)
        for j in element.xpath("./child/text()"):
            child_inum=int(j)
            queue=[dir_tree]
            while len(queue)>0:
                current=queue.pop(0)
                if parent_inum==current.name:
                    current.addChild(child_inum)
                else:
                    #array.append(current.name)
                    queue.extend(current.children)

#calculate maximum depth            
maxdepth=dir_tree.maxDepth()
output_dict["maximum depth of directory tree"]=maxdepth


#calculate file size
f_size_l=[]
cnt=1
for element in tree.xpath("/fsimage/INodeSection/inode[type='FILE']/blocks"):
    #printf(element)
    blk_size = 0
    for num in element.xpath("./block/numBytes/text()"):
        blk_size +=int(num)
    f_size_l.append(blk_size)
    
f_size_d={}
f_size_d["max"]=max(f_size_l)
f_size_d["min"]=min(f_size_l)
output_dict["file size"]=f_size_d


#output json file
json.dump(output_dict,open(output_json,'w'),indent=4)

