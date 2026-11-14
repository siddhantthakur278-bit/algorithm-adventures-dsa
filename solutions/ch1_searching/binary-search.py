def search(nums: list[int], target: int) -> int:
    n=len(nums)
    l,r=0,n-1
    if nums[0]==target:
        return 0
    while l<r:
        m=(l+r)//2
        if nums[m]==target:
            return m 
        elif nums[m]>target:
            r=m-1
        else:
            l=m+1
    return -1